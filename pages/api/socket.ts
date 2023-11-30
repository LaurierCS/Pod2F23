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
  [roomid: string]: [User | undefined, User | undefined]
}

type UId = string
interface User {
  uid: string
  socket: Socket.Socket
  blacklist: Array<UId>
} 

interface SocketRoomMap {
  [socketId: string]: string | undefined
}

const rooms: Rooms = {};

const queue: Array<User> = [];

const socket_room_map: SocketRoomMap = {};

function randId() {
  return Math.random().toString(36).substring(10) + 
    crypto.getRandomValues(new Uint32Array(1))[0].toString(20) + 
    Date.now().toString(36).slice(-2);
}

function findOtherClient(clientId: string) {
  const roomId = socket_room_map[clientId];
  if (!roomId) return;

  const room = rooms[roomId];
  let otherClient: User | undefined;
  
  for (let i = 0; i < room.length; i++) {
    const user = room[i];
    if (user?.uid && user.uid != clientId) otherClient = user;
  }

  // if (!otherClient) throw Error('No other client found in room');
  if (!otherClient) return;
  else return otherClient;
}

function pairUsers(user: User) {
  console.log(queue.map((user) => user.uid));

  if (queue.length < 1)
    addQueue(user);

  for (let i = 0; i < queue.length; i++) {
    const otherUser = queue[i];
    
    if (otherUser.uid == user.uid)
      continue;

    if (user.blacklist.find((uid) => uid == otherUser.uid))
      continue;

    queue.splice(i, 1);
    removeQueue(user.uid)
    console.log('pair found');
    return { roomId: randId(), otherUser };
  }

  addQueue(user);
  console.log(queue.map((user) => user.uid));
  return;
}

function addQueue(user: User) {
  if (!queue.find((user) => user.uid == user.uid))
    queue.push(user);
  console.log(queue.map((user) => user.uid));
}

function removeQueue(uid: UId) {
  for (let i = 0; i < queue.length; i++) {
    const user = queue[i];
    
    if (user.uid == uid) {
      queue.splice(i, 1)
      break;
    }
  }
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

    socket.onAny(() => {
      socket.timeout(5000).emitWithAck('to-ping-needsAck').catch(() => {
        socket.disconnect();
        console.log('disconnecting socket: ' + socket.id);
      });
    })

    socket.on('hello', () => {
      console.log('server: hello recieved');
    });
  
    socket.on('videoSend', (uid: string, b64: string) => {
      // validate the stream?
      let other: User;
      try {
        const oc = findOtherClient(uid);
        if (oc)
          other = oc;
        else {
          // console.log('no peer for video send');
          return;
        }
      } catch {
        // console.log('no peer for video send');
        return;
      }
      other.socket.emit('videoRec', b64, uid);
    });

    socket.on('disconnect', (uid) => {
      socket.disconnect()

      removeQueue(uid)

    });

    socket.on('terminate', (uid: string, blacklist: string[]) => {
      // blacklist = Array.from(blacklist)
      const otherClient = findOtherClient(uid);
      console.log(blacklist)
      if (typeof socket_room_map?.[uid] == 'string' && socket_room_map?.[uid]) 
        rooms[(socket_room_map[uid]) as string] = [undefined, undefined];
      if (typeof socket_room_map?.[otherClient?.uid || ''] == 'string' && socket_room_map?.[otherClient?.uid || ''])
        rooms[(socket_room_map[otherClient?.uid || '']) as string] = [undefined, undefined];

      socket_room_map[uid] = undefined;
      if (otherClient)
        socket_room_map[otherClient.uid] = undefined;
      
      addQueue({ uid, blacklist, socket });
      if (otherClient)
      addQueue({ uid, blacklist, socket });

      console.log("Terminating with blacklist: " + blacklist)
    });

    socket.on('setup-video-recieve', (uid, blacklist) => {
      // blacklist = Array.from(blacklist)
      const res = pairUsers({ uid, blacklist, socket });
      
      if (!res) {
        console.log('no pairing avail');
        return;
      }
      console.log('uid: ' + uid + ' paried with: ' + res.otherUser.uid);
      const roomid = res.roomId;
      const otherUser = res.otherUser;

      console.log('setting video recieve for uid: ' + uid);

      rooms[roomid] = [undefined, undefined];
      rooms[roomid].push({ uid, socket, blacklist });
      socket_room_map[uid] = roomid;

      rooms[roomid].push(otherUser);
      socket_room_map[otherUser.uid] = roomid;


      socket.emit('peer-id', otherUser.uid);
      otherUser.socket.emit('peer-id', uid);
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