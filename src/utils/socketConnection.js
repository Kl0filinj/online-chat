import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:3000');
// https://online-chat-server.onrender.com
export default socket;
