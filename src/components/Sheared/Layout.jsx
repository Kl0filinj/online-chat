import { Container } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Container
      maxW="container.lg"
      bg="green.400"
      textAlign={'center'}
      as="main"
    >
      {children}
    </Container>
  );
};

export default Layout;
