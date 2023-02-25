import { Box, Heading, Link, Text, Wrap, WrapItem } from '@chakra-ui/react';
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
        // width={{ base: '280px', md: '448px', xl: '458px' }}
        mx={'auto'}
        my={'10'}
      >
        <Wrap spacing={4}>
          {rooms.map(({ name }) => (
            <WrapItem margin={'10px !important'} className="gradient-border">
              <Box>
                <Text>{name}</Text>
                <Link>Get In</Link>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Box>
  );
};

export default RoomsHub;

// .gradient-border {
//   --border-width: 3px;

//   &::after {
// position: absolute;
// content: "";
// top: calc(-1 * var(--border-width));
// left: calc(-1 * var(--border-width));
// z-index: -1;
// width: calc(100% + var(--border-width) * 2);
// height: calc(100% + var(--border-width) * 2);
// background: linear-gradient(
//   60deg,
//   hsl(224, 85%, 66%),
//   hsl(269, 85%, 66%),
//   hsl(314, 85%, 66%),
//   hsl(359, 85%, 66%),
//   hsl(44, 85%, 66%),
//   hsl(89, 85%, 66%),
//   hsl(134, 85%, 66%),
//   hsl(179, 85%, 66%)
// );
// background-size: 300% 300%;
// background-position: 0 50%;
// border-radius: calc(2 * var(--border-width));
// animation: moveGradient 4s alternate infinite;
//   }
// }

// @keyframes moveGradient {
//   50% {
//     background-position: 100% 50%;
//   }
// }
