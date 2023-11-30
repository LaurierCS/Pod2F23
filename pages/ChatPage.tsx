import React, { useEffect, useState, useRef } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../src/app/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore'; 
import { useRouter } from 'next/router';
import NavBar from '../src/app/Utility/NavBar'
import './main.css'

const ChatRenderingPage = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [sessionID, setSessionId] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false); // New state to control rendering
    const router = useRouter();

    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [isVideoCallStarted, setVideoCallStarted] = useState(false);
    const rtcPeerConnection = useRef(null);
  
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
  
    const startButtonHandler = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);

        localVideoRef.current.srcObject = stream;
        rtcPeerConnection.current = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });
  
        stream.getTracks().forEach(track => rtcPeerConnection.current.addTrack(track, stream));
  
        rtcPeerConnection.current.onicecandidate = handleICECandidate;
        rtcPeerConnection.current.ontrack = handleTrack;
  
        const offer = await rtcPeerConnection.current.createOffer();
        await rtcPeerConnection.current.setLocalDescription(offer);
  
        // In a real-world scenario, you would send the offer to the other peer using a signaling server
        const remoteOffer = prompt('Copy this offer and send it to the other peer:', JSON.stringify(offer));
        await handleOffer(remoteOffer);
  
        setVideoCallStarted(true);
      } catch (error) {
        console.error('Error starting video call:', error);
      }
    };
  
    const handleOffer = async remoteOffer => {
      const offer = new RTCSessionDescription(JSON.parse(remoteOffer));
      await rtcPeerConnection.current.setRemoteDescription(offer);
  
      const answer = await rtcPeerConnection.current.createAnswer();
      await rtcPeerConnection.current.setLocalDescription(answer);
  
      // In a real-world scenario, you would send the answer to the other peer using a signaling server
      const remoteAnswer = prompt('Copy this answer and send it to the other peer:', JSON.stringify(answer));
      await handleAnswer(remoteAnswer);
    };
  
    const handleAnswer = async remoteAnswer => {
      const answer = new RTCSessionDescription(JSON.parse(remoteAnswer));
      await rtcPeerConnection.current.setRemoteDescription(answer);
    };
  
    const handleICECandidate = event => {
      if (event.candidate) {
        // In a real-world scenario, you would send the ICE candidate to the other peer using a signaling server
        const remoteICECandidate = prompt('Copy this ICE candidate and send it to the other peer:', JSON.stringify(event.candidate));
        handleRemoteICECandidate(remoteICECandidate);
      }
    };
  
    const handleRemoteICECandidate = async remoteICECandidate => {
      const candidate = new RTCIceCandidate(JSON.parse(remoteICECandidate));
      await rtcPeerConnection.current.addIceCandidate(candidate);
    };
  
    const handleTrack = event => {
      setRemoteStream(event.streams[0]);
      remoteVideoRef.current.srcObject = event.streams[0];
    };
  
    const stopButtonHandler = () => {
      rtcPeerConnection.current.close();
      localStream.getTracks().forEach(track => track.stop());
  
      setLocalStream(null);
      setRemoteStream(null);
      setVideoCallStarted(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setUsername(userDoc.data().username);
                }
                setIsReady(true); // Set ready state to true if user is authenticated
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsReady(true); 
        }, 3000);

        return () => clearTimeout(timeoutId); // clears timeout
    }, []);

    if (!isReady) {
        return <div>Loading...</div>; // Loading instead of rendering chat temporarely.
    }

    return (
       <>
        <NavBar />     
        <div className = "flex justify-center">
            <video width="750" height="500"  ref={localVideoRef} autoPlay playsInline muted />
            <video width="750" height="500"  ref={remoteVideoRef} autoPlay playsInline />
        </div>

        <div className = "flex justify-center">
            <button onClick={startButtonHandler} disabled={isVideoCallStarted} className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Start Chat
            </button>
            <button onClick={stopButtonHandler} disabled={!isVideoCallStarted} className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Stop Video Call
            </button>
        </div>
       </> 
       
    );
}

export default ChatRenderingPage;
