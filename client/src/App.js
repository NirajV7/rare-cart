import React, { useEffect, useState } from 'react' ;
import io from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  useEffect(() => {
   // Initialize Socket.IO client
    const newSocket = io('http://localhost:5000', {
      withCredentials: true,
      transports: ['websocket', 'polling'], // Try both transports
      reconnectionAttempts: 5, // Number of reconnection attempts
      reconnectionDelay: 1000, // Delay between reconnections in ms
    });
     setSocket(newSocket);
     // Connection events
    newSocket.on('connect', () => {
      console.log('Connected to server!');
      setConnectionStatus('Connected');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnectionStatus('Disconnected');
    });

    newSocket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setConnectionStatus(`Error: ${err.message}`);
    });

    // Cleanup on component unmount
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, []);

   return (
    <div className="p-4">
      <h1>RareCart</h1>
      <p>Socket.io connection status: {connectionStatus}</p>
      {socket && (
        <p>Socket ID: {socket.id || 'Not connected'}</p>
      )}
    </div>
  );
}

export default App;