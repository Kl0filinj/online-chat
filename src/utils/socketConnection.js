// import { useRef } from 'react';
// import infoToast from 'components/sheared/Toasts/infoToast';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addReceivedMessage } from 'redux/room/room-slice';
import { io } from 'socket.io-client';

const socket = io.connect('https://online-chat-server.onrender.com');

// export const useSocket = () => {
//   const dispatch = useDispatch();
//   const [typingResponse, setTypingResponse] = useState('');

//   useEffect(() => {
//     socket.on('newUser', data => {
//       console.log('NEW USER CONNECTED', data);
//       infoToast(`User ${data.userName} joined to chat !`, {
//         autoClose: 30000,
//       });
//     });

//     socket.on('receiveMessage', data => {
//       console.log('RECEIVE', data);
//       dispatch(addReceivedMessage(data));
//     });

//     socket.on('typingResponse', data => {
//       console.log('TYPING RESP');
//       data === 'stop' ? setTypingResponse('') : setTypingResponse(data);
//     });
//   }, [dispatch]);

//   return { typingResponse };
// };

export default socket;
// https://online-chat-server.onrender.com
// http://localhost:1488
