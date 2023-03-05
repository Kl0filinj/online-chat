import { Container } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { isLoggedInSelector } from 'redux/auth/auth-selector';
import UserNavigation from 'components/UserNavigation/UserNavigation';

const SharedLayout = () => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  return (
    <Container
      maxW={{ base: 'container.xs', md: 'container.md', xl: 'container.lg' }}
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
