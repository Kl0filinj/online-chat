import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Heading, Wrap, Link, WrapItem } from '@chakra-ui/react';
import Loader from 'components/Loader/Loader';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userSelector } from 'redux/auth/auth-selector';
import { getAllRooms } from 'redux/room/room-operations';
import { allRoomsSelector, isLoadingSelector } from 'redux/room/room-selector';
import socket from 'utils/socketConnection';

const RoomsHub = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(allRoomsSelector);
  const isLoading = useSelector(isLoadingSelector);
  const { name, _id } = useSelector(userSelector);

  const handleJoin = roomId => {
    console.log(`Connection to room ${roomId}`);
    socket.emit('joinRoom', { roomId, userName: name, userId: _id });
  };

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
        // width={{ base: '280px', md: '448px', xl: '458px' }}
        mx={'auto'}
        my={'10'}
      >
        <Wrap spacing={4} justify="center">
          {!isLoading ? (
            <>
              {rooms.map(({ name, _id }) => (
                <WrapItem
                  key={_id}
                  margin={'10px !important'}
                  w={'44'}
                  h={'100px'}
                  className="gradient-border"
                >
                  <Box>
                    <Heading fontSize={'2xl'}>{name}</Heading>
                    <Link as={NavLink} to={_id} onClick={() => handleJoin(_id)}>
                      Get in room <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Box>
                </WrapItem>
              ))}
            </>
          ) : (
            <Loader />
          )}
        </Wrap>
      </Box>
    </Box>
  );
};

export default RoomsHub;
