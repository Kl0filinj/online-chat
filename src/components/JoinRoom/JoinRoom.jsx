import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Heading,
} from '@chakra-ui/react';
import React from 'react';

const JoinRoom = ({ socket, dispatch, state }) => {
  const handleJoin = () => {
    console.log(`Connection to room ${state.roomId}`);
    socket.emit('joinRoom', state.roomId);
    dispatch({ type: 'toggleShowChat', payload: true });
  };
  return (
    <Box>
      <Heading>Online Chat</Heading>
      <Box textAlign={'center'}>
        <FormControl maxW={'xs'} mx={'auto'}>
          <FormLabel>User name</FormLabel>
          <Input
            focusBorderColor="lime"
            type="text"
            value={state.userName}
            onChange={evt =>
              dispatch({
                type: 'userNameChange',
                payload: evt.target.value,
              })
            }
          />
          <FormHelperText>Create your own User Name</FormHelperText>
        </FormControl>
        <FormControl maxW={'xs'} mx={'auto'}>
          <FormLabel>RoomId</FormLabel>
          <Input
            focusBorderColor="lime"
            type="text"
            value={state.roomId}
            onChange={evt =>
              dispatch({
                type: 'roomIdChange',
                payload: evt.target.value,
              })
            }
          />
          <FormHelperText>
            Ask you friend about Room ID to connect
          </FormHelperText>
        </FormControl>
      </Box>
      <Button onClick={handleJoin} mt={'5'} colorScheme="whatsapp">
        Join Room
      </Button>
    </Box>
  );
};

export default JoinRoom;
