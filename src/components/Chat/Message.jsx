import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const Message = ({ text, author, authorChecker, createdAt }) => {
  const convertDate = date => {
    const isoDate = new Date(date);
    const hours = String(isoDate.getHours()).padStart(2, '0');
    const minutes = String(isoDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <Box
      maxW={'50%'}
      w={'max-content'}
      ml={authorChecker('auto', 'none', author)}
      py={'0.5'}
      px={'3'}
    >
      <Box textAlign={authorChecker('end', 'start', author)}>
        <Text fontSize={'xs'} as={'span'}>
          {`${author}`}
        </Text>
      </Box>
      <Box
        bgColor={authorChecker('purple.600', 'green.600', author)}
        borderRadius={'sm'}
      >
        <Text p={'3'} lineHeight={'1.2'}>
          {text}
        </Text>
        <Box textAlign={'end'}>
          <Text fontSize={'xs'} as={'span'} px={'1'} color={'gray.300'}>
            {convertDate(createdAt)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
