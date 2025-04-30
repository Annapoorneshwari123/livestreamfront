import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Your server address
const HOST_ID = 'host123'; // fixed ID for host

export default function Broadcast() {
  const videoRef = useRef();
  const peers = useRef({});
  const streamRef = useRef();

  useEffect(() => {
    // Start local camera
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;

      socket.emit('join', HOST_ID); // join as host

      // When a new viewer connects
      socket.on('viewer-connected', async (viewerId) => {
        console.log('Viewer connected:', viewerId);

        const peer = new RTCPeerConnection(); // no ICE servers
        peers.current[viewerId] = peer;

        // Add stream tracks
        stream.getTracks().forEach(track => peer.addTrack(track, stream));

        // No ICE candidates needed
        peer.onicecandidate = () => {};

        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);

        // Send the offer to this viewer
        socket.emit('offer', { to: viewerId, offer });
      });

      // Receive answer from a viewer
      socket.on('answer', ({ from, answer }) => {
        const peer = peers.current[from];
      
        if (!peer) {
          console.warn(`No peer connection found for ${from}`);
          return;
        }
      
        if (peer.signalingState === 'have-local-offer') {
          peer.setRemoteDescription(new RTCSessionDescription(answer))
            .then(() => console.log(`Remote description set for ${from}`))
            .catch((err) => console.error(`setRemoteDescription failed for ${from}:`, err));
        } else {
          console.log(`Peer ${from} already in signaling state: ${peer.signalingState}`);
        }
      });
      
    };

    init();

    return () => {
      Object.values(peers.current).forEach(peer => peer.close());
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Broadcasting Live</h2>
      <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%' }} />
    </div>
  );
}
