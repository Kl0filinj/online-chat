import { Text, Box, IconButton } from '@chakra-ui/react';
import { ExitIcon } from 'components/sheared/customIcons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'redux/auth/auth-operations';
import { userSelector } from 'redux/auth/auth-selector';

const UserNavigation = () => {
  const { name } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <Box
      borderBottom={'4px'}
      borderBottomRadius={'md'}
      py={'2'}
      mb={'5'}
      display={'flex'}
      justifyContent={'end'}
    >
      <Box display={'flex'} alignItems={'end'}>
        <Text as={'span'} fontSize={'xl'} mr={'3'}>
          Hi,{' '}
          <Text as={'b'} textDecoration={'underline'}>
            {name}
          </Text>
        </Text>

        <IconButton
          variant={'unstyled'}
          aria-label="Exit from account"
          icon={
            <ExitIcon
              boxSize={'40px'}
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
