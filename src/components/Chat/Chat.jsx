import {
  Box,
  Button,
  Divider,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import Loader from 'components/Loader/Loader';
import { SendIcon } from 'components/sheared/customIcons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import { PulseLoader } from 'react-spinners';
import { userSelector } from 'redux/auth/auth-selector';
import {
  addMessage,
  // addUser,
  getRoomById,
} from 'redux/room/room-operations';
import {
  currentRoomSelector,
  isLoadingSelector,
} from 'redux/room/room-selector';
import {
  addReceivedMessage,
  // addactiveUser
} from 'redux/room/room-slice';
import socket from 'utils/socketConnection';
import Message from './Message';

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [typingResponse, setTypingResponse] = useState('');
  const dispatch = useDispatch();
  const {
    messages,
    name: roomName,
    // residents
  } = useSelector(currentRoomSelector);
  const { name, _id } = useSelector(userSelector);
  const { roomId } = useParams();
  const isLoading = useSelector(isLoadingSelector);

  // const getMessageTime = iso => {
  //   const dateObj = new Date(iso);
  //   const hour = dateObj.getUTCHours();
  //   const minute = dateObj.getUTCMinutes();
  //   return `${hour}:${minute}`;
  // };

  const authorChecker = (validValue, invalidValue, messageAuthor) => {
    return messageAuthor === name ? validValue : invalidValue;
  };

  const handleTyping = () => {
    console.log('typing');
    socket.emit('startTyping', {
      roomId,
      typingUserMessage: `${name} is typing`,
    });
  };

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
    await socket.emit('sendMessage', { ...messageData, _id: uuidv4() });
    dispatch(addMessage(messageData));
    socket.emit('stopTyping', {
      roomId,
      typingUserMessage: `stop`,
    });
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
    });

    socket.on('typingResponse', data =>
      data === 'stop' ? setTypingResponse('') : setTypingResponse(data)
    );

    // socket.on('newUser', ({ userName, userId, roomId }) => {
    //   console.log('NEW_USER', userName);
    //   dispatch(addactiveUser({ userName, userId, roomId }));
    // });
  }, [dispatch]);

  // useEffect(() => {
  //   socket.on('typingResponse', data => setTypingResponse(data));
  // }, [socket]);

  return (
    <Box display={'flex'}>
      <Box flexBasis={'20%'}>
        <Button colorScheme={'purple'}>
          <Link to={'/rooms'}>Change Room</Link>
        </Button>
        <Text>
          Room:{' '}
          <Text as={'b'} fontSize={'xl'}>
            {roomName}
          </Text>
        </Text>
        <Box w={'80%'} mx={'auto'} my={'3'}>
          <Divider />
        </Box>

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
            {!isLoading ? (
              <>
                {messages?.length !== 0 ? (
                  <>
                    {messages?.map(({ text, author, _id }) => (
                      <Message
                        key={_id}
                        text={text}
                        author={author}
                        authorChecker={authorChecker}
                      />
                    ))}
                    {typingResponse !== '' && (
                      <Box maxW={'50%'} w={'max-content'} ml={'none'} p={'4'}>
                        <Box bgColor={'gray.600'} borderRadius={'sm'}>
                          <Text p={'3'} lineHeight={'1.2'} as={'span'}>
                            {typingResponse}{' '}
                            <PulseLoader color="#805AD5" size="9px" />
                          </Text>
                        </Box>
                      </Box>
                    )}
                  </>
                ) : (
                  <Heading>There is no messages, be the first one ^_^</Heading>
                )}
              </>
            ) : (
              <Loader />
            )}
          </ScrollToBottom>
        </Box>
        <Box display={'flex'} bgColor={'#222222'}>
          <InputGroup size="md">
            <Input
              variant={'filled'}
              borderRadius={'xl'}
              value={currentMessage}
              onChange={evt => {
                setCurrentMessage(evt.target.value);
                handleTyping();
              }}
              placeholder="Enter message..."
            />
            <InputRightElement width="4.5rem">
              <IconButton
                aria-label="Send message"
                icon={
                  <SendIcon
                    transitionProperty={'fill'}
                    transitionDuration={'250ms'}
                    transitionTimingFunction={'cubic-bezier(0.4, 0, 0.2, 1)'}
                    _hover={{
                      fill: 'purple.500',
                    }}
                  />
                }
                variant={'unstyled'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                isDisabled={currentMessage === ''}
                onClick={() => sendMessage(currentMessage)}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
