import { Box, Heading, Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRooms } from 'redux/room/room-operations';
import { allRoomsSelector } from 'redux/room/room-selector';

const RoomsHub = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(allRoomsSelector);
  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  return (
    <Box>
      <Heading
        color={'#ffffff'}
        textShadow={
          '    0 0 1px #fff,    0 0 2px #fff,    0 0 5px #fff,    0 0 11px #ae00ff,    0 0 20px #ae00ff,    0 0 30px #ae00ff,    0 0 55px #ae00ff,    0 0 80px #ae00ff'
        }
      >
        CHOOSE ROOM FOR CHATING
      </Heading>
      <Box
        // position="relative"
        width={{ base: '280px', md: '448px', xl: '458px' }}
        mx={'auto'}
        my={'10'}
      >
        <Stack>
          {rooms.map(({ name }) => (
            <Box>{name}</Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default RoomsHub;
