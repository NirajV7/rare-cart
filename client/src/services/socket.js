import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
  autoConnect: false,
  reconnection: true,
});

export const initSocket = () => {
  if (!socket.connected) socket.connect();
  return socket;
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};
