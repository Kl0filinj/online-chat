import { io } from 'socket.io-client';

const socket = io.connect('https://online-chat-server.onrender.com');
// https://online-chat-server.onrender.com
// http://localhost:3030
export default socket;
