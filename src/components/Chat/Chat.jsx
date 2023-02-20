import { Box, Button, FormControl, Heading, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const Chat = ({ socket, state }) => {
  const [currentMessage, setCurrentMessage] = useState('');

  const sendMessage = async () => {
    const messageTime =
      new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes();
    const messageData = {
      roomId: state.roomId,
      author: state.userName,
      message: currentMessage,
      time: messageTime,
    };
    await socket.emit('sendMessage', messageData);
  };

  useEffect(() => {
    socket.on('receiveMessage', data => {
      console.log(data);
    });
  }, [socket]);

  return (
    <Box>
      <Box>
        <Heading>Online Chat</Heading>
      </Box>
      <Box></Box>
      <Box>
        <FormControl>
          <Input
            type="text"
            value={currentMessage}
            onChange={evt => setCurrentMessage(evt.target.value)}
          />
        </FormControl>
        <Button disabled={currentMessage === ''} onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
