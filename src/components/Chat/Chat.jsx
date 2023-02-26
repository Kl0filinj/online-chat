import { Box, Button, Heading, Input, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import { userSelector } from 'redux/auth/auth-selector';
import {
  addMessage,
  // addUser,
  getRoomById,
} from 'redux/room/room-operations';
import { currentRoomSelector } from 'redux/room/room-selector';
import {
  addReceivedMessage,
  // addactiveUser
} from 'redux/room/room-slice';
import socket from 'utils/socketConnection';

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const dispatch = useDispatch();
  const {
    messages,
    // residents
  } = useSelector(currentRoomSelector);
  const { name, _id } = useSelector(userSelector);
  const { roomId } = useParams();
  // const messageEndRef = useRef();

  // const getMessageTime = iso => {
  //   const dateObj = new Date(iso);
  //   const hour = dateObj.getUTCHours();
  //   const minute = dateObj.getUTCMinutes();
  //   return `${hour}:${minute}`;
  // };

  const authorChecker = (validValue, invalidValue, messageAuthor) => {
    return messageAuthor === name ? validValue : invalidValue;
  };

  // const scrollToBottom = () => {
  //   messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  // const handleDisconnect = () => {
  //   console.log(`Disconnection from room ${roomId}`);
  //   socket.emit('disconnect', roomId);
  // };

  const sendMessage = async () => {
    const messageData = {
      room: roomId,
      text: currentMessage.trim(),
      author: name,
    };
    await socket.emit('sendMessage', messageData);
    dispatch(addMessage(messageData));
    // scrollToBottom();
    setCurrentMessage('');
  };

  useEffect(() => {
    console.log(`Connection to room ${roomId}`);
    socket.emit('joinRoom', { roomId, userName: name, userId: _id });
    dispatch(getRoomById(roomId));
    //   .then(() =>
    //   dispatch(addUser({ userName: name, userId: _id, roomId }))
    // );
  }, [dispatch, roomId, _id, name]);

  useEffect(() => {
    socket.on('receiveMessage', data => {
      console.log('RECEIVE', data);
      dispatch(addReceivedMessage(data));
      // scrollToBottom();
    });
    // socket.on('newUser', ({ userName, userId, roomId }) => {
    //   console.log('NEW_USER', userName);
    //   dispatch(addactiveUser({ userName, userId, roomId }));
    // });
  }, [dispatch]);

  return (
    <Box display={'flex'}>
      <Box flexBasis={'20%'}>
        <Button>
          <Link to={'/rooms'}>Change Room</Link>
        </Button>
        <Heading>Users:</Heading>
        <VStack>
          {/* {residents?.map(({ userName, userId }) => (
            <Box key={userId}>
              <Text>{userName}</Text>
            </Box>
          ))} */}
        </VStack>
      </Box>

      <Box flexBasis={'80%'}>
        <Box
        // bgColor={'gray.500'} maxH={'md'} overflowY={'scroll'}
        >
          <ScrollToBottom className="scrollToBotom">
            {messages?.map(({ text, author, _id }) => (
              <Box
                key={_id}
                maxW={'45%'}
                w={'max-content'}
                ml={authorChecker('auto', 'noen', author)}
                p={'3'}
              >
                <Box textAlign={authorChecker('end', 'start', author)}>
                  <Text fontSize={'xs'} as={'span'}>
                    {`${author}`}
                  </Text>
                  {/* <Text fontSize={'xs'} as={'span'}>
                  {getMessageTime(createdAt)}
                </Text> */}
                </Box>
                <Box bgColor={'purple.600'} borderRadius={'sm'}>
                  <Text p={'3'}>{text}</Text>
                </Box>
              </Box>
            ))}
          </ScrollToBottom>
        </Box>
        <Box display={'flex'} overflowY={'scroll'}>
          <Input
            value={currentMessage}
            onChange={evt => setCurrentMessage(evt.target.value)}
          />
          <Button
            isDisabled={currentMessage === ''}
            onClick={() => sendMessage(currentMessage)}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
