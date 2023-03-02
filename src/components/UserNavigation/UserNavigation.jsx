import { Text, Box, IconButton } from '@chakra-ui/react';
import { ExitIcon } from 'components/sheared/customIcons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/auth/auth-operations';
import { userSelector } from 'redux/auth/auth-selector';

const UserNavigation = () => {
  const { name } = useSelector(userSelector);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };
  return (
    <Box bgColor={'red'} display={'flex'} justifyContent={'end'}>
      <Box>
        <Text
          as={'span'}
          // textShadow={
          //   '    0 0 1px #fff,    0 0 2px #fff,    0 0 5px #fff,    0 0 11px #ae00ff,    0 0 20px #ae00ff,    0 0 30px #ae00ff,    0 0 55px #ae00ff,    0 0 80px #ae00ff'
          // }
        >
          Hi,{' '}
          <Text as={'b'} textDecoration={'underline'}>
            {name}
          </Text>
        </Text>
        {/* <Divider orientation={'vertical'} /> */}

        <IconButton
          variant={'unstyled'}
          aria-label="Exit from account"
          icon={
            <ExitIcon
              boxSize={'30px'}
              transitionProperty={'fill'}
              transitionDuration={'250ms'}
              transitionTimingFunction={'cubic-bezier(0.4, 0, 0.2, 1)'}
              _hover={{
                fill: 'purple.500',
              }}
            />
          }
          onClick={handleLogOut}
        />
        {/* <Button>Log Out</Button> */}
      </Box>
    </Box>
  );
};

export default UserNavigation;
