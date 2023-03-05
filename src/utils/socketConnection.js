// import { useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io.connect('https://online-chat-server.onrender.com');
// const useSocket = () => {
//   const socket = useRef();
//   socket.current = io.connect('http://localhost:1488');
//   return socket;
// };

// export default useSocket;
// https://online-chat-server.onrender.com
// http://localhost:1488
export default socket;
