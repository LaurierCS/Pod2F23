import type { Server as HTTPServer } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Socket as NetSocket } from 'net';
import type Socket from 'socket.io';
import { Server as IOServer } from 'socket.io';

// TODO: Dynamic rooms
// TODO: Destroy rooms on socket disconnects
// TODO: Socket/room recovery

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

interface Rooms {
  [roomid: string]: Array<User>
}

type User = {0: string, 1: Socket.Socket}

interface SocketRoomMap {
  [socketId: string]: string
}

const rooms: Rooms = {
};

const socket_room_map: SocketRoomMap= {};

function findOtherClient(clientId: string) {
  const roomId = socket_room_map[clientId];
  const room = rooms[roomId];
  let otherClient: User | undefined;
  
  for (let i = 0; i < room.length; i++) {
    const user = room[i];
    if (user[0] != clientId) otherClient = user;
  }

  if (!otherClient) throw Error('No other client found in room');
  else return otherClient;
}

// Hot-reload not supported.
const SocketHandler = (_: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    console.log('Socket is already running.');
    res.end();
    return;
  }
  console.log('Socket is initializing...');

  const io = new IOServer(res.socket.server, { maxHttpBufferSize: 1e8 });
  res.socket.server.io = io;



  io.on('connection', (socket) => {
    socket.timeout(5000).emitWithAck('to-ping-needsAck').catch(() => {
      socket.disconnect();
      console.log('disconnecting socket: ' + socket.id);
    });

    socket.on('hello', () => {
      console.log('server: hello recieved');
    });
  
    socket.on('videoSend', (uid: string, b64: string) => {
      // validate the stream?
      let other: User;
      try {
        other = findOtherClient(uid);
      } catch {
        return;
      }
      other[1].emit('videoRec', b64);
    });

    socket.on('setup-video-recieve', (uid) => {
      console.log('setting video recieve for uid: ' + uid);
      // socket.join("room1"+"-recip-"+uid)
      if (!rooms['room1']) rooms['room1'] = [];
      rooms['room1'].push([uid, socket]);
      socket_room_map[uid] = 'room1';
    });

    const conncheck = setInterval(async () => { 
      try {
        await socket.timeout(5000).emitWithAck('to-ping-needsAck');
      } catch {
        socket.disconnect();
        console.log('disconnecting socket: ' + socket.id);
        clearInterval(conncheck);
      }
    }, 10000);

  });



  res.end();
};

export default SocketHandler;