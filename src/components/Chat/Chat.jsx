import {
  Box,
  Button,
  Heading,
  Input,
  // Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  // const [messageList, setMessageList] = useState(['123', '123', '123']);

  // const sendMessage = async () => {
  //   const messageId = uuidv4();
  //   const messageTime =
  //     new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes();
  //   const messageData = {
  //     roomId: state.roomId,
  //     author: state.userName,
  //     message: currentMessage,
  //     time: messageTime,
  //     id: messageId,
  //   };
  //   await socket.emit('sendMessage', messageData);
  //   setMessageList(list => [...list, messageData]);
  //   setCurrentMessage('');
  // };

  // useEffect(() => {
  //   socket.on('receiveMessage', data => {
  //     console.log('RECEIVE', data);
  //     setMessageList(list => [...list, data]);
  //   });
  // }, [socket]);

  return (
    <Box display={'flex'}>
      <Box flexBasis={'20%'}>
        <Button>Change Room</Button>
        <Heading>Users:</Heading>
      </Box>

      <Box flexBasis={'80%'}>
        <Box bgColor={'gray.500'} minH={'md'}>
          Chat
        </Box>
        <Box display={'flex'} overflowY={'scroll'}>
          <Input
            value={currentMessage}
            onChange={evt => setCurrentMessage(evt.target.value)}
          />
          <Button>Send</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
