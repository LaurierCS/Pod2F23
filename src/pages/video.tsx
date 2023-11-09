import { useEffect } from 'react';
import type { Socket } from 'socket.io-client';
import io from 'socket.io-client';

// TODO: add media sources to a queu
// TODO: address rampent memory and cpu usage
// TODO: Clean up random code and functions
// TODO: Dynamic rooms
// TODO: Socket/room recovery

let socket: Socket;

function getUid() {
  const lsuid = localStorage.getItem('uid'); 
  if (lsuid) uid = lsuid;
  else {
    const newuid = Math.random().toString(36).substring(10) + 
    crypto.getRandomValues(new Uint32Array(1))[0].toString(20) + 
    Date.now().toString(36).slice(-2);
    localStorage.setItem('uid', newuid);
    uid = newuid;
  }
}

// User ID
let uid: string;


const recieveBuffer: Uint8Array[] = [];
let queued = false;
let looping = false;
let resetLoop = false;

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mediaLoop(mediaSource: MediaSource) {
  if (looping) return;

  looping = true;

  while (true) {
    console.log('looping');
    if (queued) {
      await wait(250);
      continue;
    }
    const newbuf = recieveBuffer.shift();
    if (newbuf == undefined) {
      await wait(250);
      continue;
    }
    
    queued = true;

    if (mediaSource.readyState === 'open') {
      console.log('source open');
      try {
        const sourceBuffer = mediaSource.addSourceBuffer('video/webm;codecs=opus,vp8');
        sourceBuffer.appendBuffer(newbuf as Uint8Array);
        queued = false;
      } catch (e) {
        console.log(e);
      }
    }

    if (resetLoop) {
      console.log('resetting loop');
      break;
    }

    await wait(250);
  }
  resetLoop = false;
  looping = false;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mediaBuffer(mediaSource: MediaSource, newElement: Uint8Array) {
  console.log(recieveBuffer);
  if (recieveBuffer.length > 2)
    recieveBuffer.splice(1, recieveBuffer.length);
  recieveBuffer.push(newElement);

  mediaLoop(mediaSource);
}

export default function Home() {
  useEffect(() => { getUid(); }, []);
  useEffect(() => { socketInitializer(); }, []);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();
    
    socket.on('connect', async () => {
      console.log(socket.connected? 'connected. Id:' + socket.id : 'not connected');
      if (!socket.connected) {
        window.Error('not connected');
        //socket.disconnect()
        return;
      }
      //setInterval(() => { console.log("sending hello"); socket.emit("hello", "test for server")}, 1000)
      socket.emit('setup-video-recieve', uid);

      // socket.onAny((event, ...args) => {
      //   // console.log('something happened: ' + event + ' ' + args.join(' ').slice(0, 15) + '...')
      // });
      
      // eslint-disable-next-line @typescript-eslint/ban-types
      socket.on('to-ping-needsAck', (event: Function) => {
        event();
      });

      socket.on('disconnect', () => {
        console.log('disconnected');
      });
  
      
      socket.on('videoRec', (buf: ArrayBuffer) => {
        const data= new Uint8Array(buf);

        if(!(data[0] === 26 && data[1] === 69 && data[2] === 223)) {
          return;
        }

        media = new MediaSource();
        const sourceURL = URL.createObjectURL(media);
        videoplayer.src = sourceURL;

        videoplayer.onloadedmetadata = () => {
          videoplayer.loop = false;
          videoplayer.muted = false;
        };

        media.onsourceopen= function() {
          sourceBuffer= media.addSourceBuffer('video/webm;codecs=opus, vp8');
          sourceBuffer.appendBuffer(buf);
          // videoplayer.play()
        };
      });

      
      let media: MediaSource, sourceBuffer: SourceBuffer;
      const videoplayer = document.getElementById('video') as HTMLVideoElement;
      // const sourceURL = URL.createObjectURL(source)
      const webcamstream = (await navigator.mediaDevices.getUserMedia({ video: true, audio: true }));
      const recorder = new MediaRecorder(webcamstream, { mimeType: 'video/webm;codecs=opus,vp8', bitsPerSecond:2000  });
      recorder.start(400);
      
      const send = async (data: ArrayBuffer) => {
        socket.emit('videoSend', uid, data);
      }; 
  
      recorder.ondataavailable = async (event) => {
        const buf = await event.data.arrayBuffer();
        const data = new Uint8Array(buf);
        console.log(data);
        if (event?.data?.size > 3) {
          if(!(data[0] === 26 && data[1] === 69 && data[2] === 223)) {
            return;
          }
          await send(buf);
          try { 
            recorder.stop();
          // eslint-disable-next-line no-empty
          } catch {}
          recorder.start(400);
        }
      };
    });
  };
  // <ReactPlayer url='http://localhost:3000/loading_circle_dots.mp4' playing={true} loop={true} />
  return (
    <main
      className={'flex min-h-screen flex-col items-center justify-between p-24'}
    >
      <h2>Monke</h2>
      
      <video id="video" src='/loading_circle_dots.mp4' loop autoPlay muted></video>
    </main>
  );
}
