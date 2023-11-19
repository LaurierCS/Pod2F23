import { useEffect } from 'react';
import type { Socket } from 'socket.io-client';
import io from 'socket.io-client';

// TODO: address rampent memory and cpu usage
// TODO: Clean up random code and functions
// TODO: Dynamic rooms
// TODO: Socket/room recovery
// TODO: Recover stream after buffer empties out once
// BUG: Streams only display sometimes

const recordTime = 150;
let socket: Socket;
const codecs = 'video/webm;codecs=opus,vp8';
const bitrate = 1000;

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


const recieveBuffer: ArrayBuffer[] = [];
const bufSize = 15;

function recieveData(data: ArrayBuffer) {
  if (recieveBuffer.length + 1 > bufSize) {
    console.log('buffer overflow');
    recieveBuffer.splice(bufSize/2);
  }
  console.log(data);
  recieveBuffer.push(data);
}

//// function checkDataWebm(d: Uint8Array) {
////   return d[0] == 26 && d[1] == 69 && d[2] == 223;
//// }

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
        recieveData(buf);
        console.log('recieved data, size: ' + recieveBuffer.length);

        appendToSourceBuffer();
      });



      const mediaSource = new MediaSource();
      const url = URL.createObjectURL(mediaSource);
      const videoplayer = document.getElementById('video') as HTMLVideoElement;
      const selfVideoplayer = document.getElementById('video-self') as HTMLVideoElement;
      let sourceBuffer: SourceBuffer;
      videoplayer.src = url;
      videoplayer.loop=false;
      videoplayer.muted=false;


      mediaSource.addEventListener('sourceopen', function() {
        sourceBuffer = mediaSource.addSourceBuffer(codecs);

        sourceBuffer.addEventListener('updateend', appendToSourceBuffer);
      });

      function appendToSourceBuffer() {
        if ( mediaSource.readyState === 'open' &&
              sourceBuffer &&
              sourceBuffer.updating === false) {
          const buf = recieveBuffer.shift();
          if (!buf) return;
          sourceBuffer.appendBuffer(buf);
        }

        if (videoplayer.buffered.length &&
          videoplayer.buffered.end(0) - videoplayer.buffered.start(0) > 1200) {
          sourceBuffer.remove(0, videoplayer.buffered.end(0) - 1200);
        }
      }


      // const sourceURL = URL.createObjectURL(source)
      const webcamstream = (await navigator.mediaDevices.getUserMedia({ video: true, audio: true }));
      const recorder = new MediaRecorder(webcamstream, { mimeType: codecs, bitsPerSecond: bitrate });
      recorder.start(recordTime);
      selfVideoplayer.srcObject = webcamstream;

      const send = async (data: ArrayBuffer) => {
        console.log('sending data');
        socket.emit('videoSend', uid, data);
      }; 

      recorder.ondataavailable = async (event) => {
        send(await event.data.arrayBuffer());
        // recieveData(await event.data.arrayBuffer());
      };
    });
  };
  // <ReactPlayer url='http://localhost:3000/loading_circle_dots.mp4' playing={true} loop={true} />
  return (
    <main
      className={'flex min-h-screen flex-col items-center justify-between p-24'}
    >
      <h2>Monke</h2>

      <video id="video" src='/loading_circle_dots.mp4' loop autoPlay muted width={320} height={180}></video>
      
      <video id="video-self" src='https://www.youtube.com/embed/rRPQs_kM_nw' autoPlay muted width={320} height={180}></video>

    </main>
  );
}
