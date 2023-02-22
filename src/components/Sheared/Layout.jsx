import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Container
      maxW="container.lg"
      // bg="yellow.100"
      textAlign={'center'}
      as="main"
      mt={'15vh'}
      border={'2px solid black'}
      borderRadius={'md'}
      p={'5'}
    >
      {/* <Suspense fallback={<Loader />}> */}
      <Outlet />
      {/* </Suspense> */}
    </Container>
  );
};

export default Layout;
