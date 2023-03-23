import infoToast from 'components/sheared/Toasts/infoToast';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'redux/auth/auth-selector';
import { addMessage, getRoomById } from 'redux/room/room-operations';
import { addReceivedMessage } from 'redux/room/room-slice';
import { v4 as uuidv4 } from 'uuid';
import socket from 'utils/socketConnection';

const useChat = roomId => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [typingResponse, setTypingResponse] = useState('');
  const { name } = useSelector(userSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomById(roomId));

    socket.on('newUser', data => {
      console.log('NEW USER CONNECTED', data);
      infoToast(`User ${data.userName} joined to chat !`, {
        autoClose: 30000,
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
    return () => {
      console.log('DISCONNECT');
    };
  }, [dispatch, roomId]);

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
  };
};

export default useChat;
