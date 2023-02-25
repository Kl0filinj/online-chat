import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Heading, Wrap, Link, WrapItem } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
        // width={{ base: '280px', md: '448px', xl: '458px' }}
        mx={'auto'}
        my={'10'}
      >
        <Wrap spacing={4}>
          {rooms.map(({ name, _id }) => (
            <WrapItem
              key={_id}
              margin={'10px !important'}
              w={'200px'}
              h={'100px'}
              className="gradient-border"
            >
              <Box>
                <Heading fontSize={'2xl'}>{name}</Heading>
                <Link as={NavLink} to={_id}>
                  Chakra Design system <ExternalLinkIcon mx="2px" />
                </Link>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Box>
  );
};

export default RoomsHub;
