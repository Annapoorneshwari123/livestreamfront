import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('https://livestreaming-42xh.onrender.com'); // Your server address

export default function Viewer() {
  const videoRef = useRef();
  const peer = useRef();
  const localStream = useRef(null); // Store local stream here

  useEffect(() => {
    const init = async () => {
      // Get the local media stream (camera)
      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

        // Show the local video stream in the viewer's video element
        if (videoRef.current) {
          videoRef.current.srcObject = localStream.current;
        }
        
        // Create a new RTCPeerConnection for this viewer
        peer.current = new RTCPeerConnection();

        // Add local tracks to the peer connection
        localStream.current.getTracks().forEach(track => {
          peer.current.addTrack(track, localStream.current);
        });

        // Send an offer to the host to start the connection
        socket.emit('viewer-join', { from: socket.id });

        // Listen for the offer from the host
        socket.on('offer', async ({ from, offer }) => {
          console.log('Received offer from', from);
          
          await peer.current.setRemoteDescription(new RTCSessionDescription(offer));
          
          const answer = await peer.current.createAnswer();
          await peer.current.setLocalDescription(answer);

          // Send the answer to the host
          socket.emit('answer', { from: socket.id, answer });
        });

        // Listen for ICE candidates and send them to the host
        peer.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('candidate', { from: socket.id, candidate: event.candidate });
          }
        };

      } catch (err) {
        console.error('Error accessing media devices.', err);
      }
    };

    init();

    return () => {
      socket.disconnect();
      if (peer.current) {
        peer.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h2 style={{color:'#E90064',
        fontfamily: '"Tangerine", cursive'
      }}>Viewer</h2>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
}
