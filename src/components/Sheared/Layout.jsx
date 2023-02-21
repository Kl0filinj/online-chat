import { Container } from '@chakra-ui/react';

const Layout = ({ children }) => {
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
      {children}
    </Container>
  );
};

export default Layout;
