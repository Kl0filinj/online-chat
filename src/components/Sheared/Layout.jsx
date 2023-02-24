import { Container } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
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
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default Layout;
