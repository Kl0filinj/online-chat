import { Avatar, Box, Button } from '@chakra-ui/react';
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
        <Button onClick={handleLogOut}>Log Out</Button>
        <Avatar name={name} />
      </Box>
    </Box>
  );
};

export default UserNavigation;
