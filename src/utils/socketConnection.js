import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:1488');

export default socket;
// https://online-chat-server.onrender.com
// http://localhost:1488
