import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react';
import React from 'react';

const JoinRoom = ({ socket, dispatch, state }) => {
  const handleJoin = () => {
    console.log(`Connection to room ${state.roomId}`);
    socket.emit('joinRoom', state.roomId);
  };
  console.log(state);

  return (
    <Box>
      <Box>
        <FormControl>
          <FormLabel>User name</FormLabel>
          <Input
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
        <FormControl>
          <FormLabel>roomId</FormLabel>
          <Input
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
      <Button onClick={handleJoin}>Join Room</Button>
    </Box>
  );
};

export default JoinRoom;
