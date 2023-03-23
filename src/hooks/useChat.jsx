import infoToast from 'components/sheared/Toasts/infoToast';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'redux/auth/auth-selector';
import {
  addMessage,
  addNewUser,
  getRoomById,
  removeNewUser,
} from 'redux/room/room-operations';
import {
  addNewReceivedUser,
  addReceivedMessage,
  removeNewReceivedUser,
} from 'redux/room/room-slice';
import { v4 as uuidv4 } from 'uuid';
import socket from 'utils/socketConnection';
import { useNavigate } from 'react-router-dom';
import warningToast from 'components/sheared/Toasts/warningToast';

const useChat = roomId => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [typingResponse, setTypingResponse] = useState('');
  const { name, _id } = useSelector(userSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRoomById(roomId));

    socket.on('newUser', data => {
      console.log('NEW USER CONNECTED', data);
      data.userName === name
        ? dispatch(addNewUser(roomId))
        : dispatch(
            addNewReceivedUser({ _id: data.userId, name: data.userName })
          );
      infoToast(`User ${data.userName} joined to chat !`, {
        autoClose: 10000,
      });
    });

    socket.on('receiveMessage', data => {
      console.log('RECEIVE', data);
      dispatch(addReceivedMessage(data));
    });

    socket.on('typingResponse', data => {
      console.log('TYPING RESP');
      data === 'stop' ? setTypingResponse('') : setTypingResponse(data);
    });

    socket.on('leaveRoomResp', data => {
      console.log('USER', data, 'DISCONNECTED');
      dispatch(removeNewReceivedUser(data));
      warningToast(`User ${name} left the chat !`, {
        autoClose: 10000,
      });
    });
    return () => {
      console.log('DISCONNECT');
    };
  }, [dispatch, roomId, _id, name]);

  const sendMessage = () => {
    const messageData = {
      room: roomId,
      text: currentMessage.trim(),
      author: name,
    };
    socket.emit('sendMessage', {
      ...messageData,
      _id: uuidv4(),
      createdAt: new Date().toISOString(),
    });
    dispatch(addMessage(messageData));
    socket.emit('stopTyping', {
      roomId,
      typingUserMessage: 'stop',
    });
    setCurrentMessage('');
  };

  const handleDisconnect = async () => {
    console.log('USER LEFT ROOM');

    dispatch(removeNewUser(roomId));
    navigate('/rooms');
    socket.emit('leaveRoom', roomId);

    console.log('roomId disconnect ', roomId);
  };

  const onEmojiClick = ({ emoji }) =>
    setCurrentMessage(`${currentMessage} ${emoji}`);

  const authorChecker = (validValue, invalidValue, messageAuthor) => {
    return messageAuthor === name ? validValue : invalidValue;
  };

  const onMessageTyping = messageValue => {
    setCurrentMessage(messageValue);
    socket.emit('startTyping', {
      roomId,
      typingUserMessage: `${name} is typing`,
    });
  };

  return {
    currentMessage,
    typingResponse,
    sendMessage,
    onEmojiClick,
    authorChecker,
    onMessageTyping,
    handleDisconnect,
  };
};

export default useChat;
