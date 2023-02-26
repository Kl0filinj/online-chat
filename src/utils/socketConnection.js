import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:3030');
// https://online-chat-server.onrender.com
// http://localhost:3030
export default socket;
