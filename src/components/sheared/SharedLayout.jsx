import { Container } from '@chakra-ui/react';
import UserNavigation from 'components/UserNavigation/UserNavigation';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { isLoggedInSelector } from 'redux/auth/auth-selector';

const SharedLayout = () => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  return (
    <Container
      maxW="container.lg"
      // bg="yellow.100"
      textAlign={'center'}
      as="main"
      mt={'15vh'}
      borderRadius={'md'}
      p={'5'}
    >
      {isLoggedIn && <UserNavigation />}
      <Outlet />
    </Container>
  );
};

export default SharedLayout;
