import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

const Loader = () => {
  return (
    <Box textAlign={'center'} mx={'auto'}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="purple.500"
        size="xl"
      />
    </Box>
  );
};

export default Loader;
