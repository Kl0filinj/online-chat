import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Chat = ({ socket, state }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  console.log(messageList);

  const sendMessage = async () => {
    const messageId = uuidv4();
    const messageTime =
      new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes();
    const messageData = {
      roomId: state.roomId,
      author: state.userName,
      message: currentMessage,
      time: messageTime,
      id: messageId,
    };
    await socket.emit('sendMessage', messageData);
    setMessageList(list => [...list, messageData]);
    setCurrentMessage('');
  };

  useEffect(() => {
    socket.on('receiveMessage', data => {
      console.log('RECEIVE', data);
      setMessageList(list => [...list, data]);
    });
  }, [socket]);

  return (
    <Box maxW={'xs'} mx={'auto'}>
      <Box py={'3'} bgColor={'blackAlpha.900'}>
        <Heading color={'whatsapp.300'}>Online Chat</Heading>
        <Text color={'white'}>ID: {state.roomId}</Text>
      </Box>
      <Box borderX={'1px solid black'} height={'xs'} overflowY={'scroll'}>
        {messageList.map(({ message, author, time, id }) => (
          <>
            <Box
              key={id}
              maxW={'45%'}
              p={'2'}
              ml={author === state.userName && 'auto'}
              mr={author !== state.userName && 'auto'}
            >
              <Box
                bgColor={author === state.userName ? 'whatsapp.400' : 'black'}
                color={author !== state.userName && 'white'}
                borderRadius={'md'}
                p={'2'}
              >
                <Text textAlign={'start'}>{message}</Text>
                <Box textAlign={'end'}>
                  <Text color={'gray.700'} fontSize={'xs'}>
                    {time}
                  </Text>
                </Box>
              </Box>
              <Text>{author}</Text>
            </Box>
          </>
        ))}
      </Box>
      <Box display={'flex'}>
        <FormControl>
          <Input
            borderRadius={'0'}
            type="text"
            value={currentMessage}
            onChange={evt => setCurrentMessage(evt.target.value)}
          />
        </FormControl>
        <Button
          borderRadius={'0'}
          isDisabled={currentMessage === ''}
          onClick={sendMessage}
          colorScheme="whatsapp"
        >
          &#9658;
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
