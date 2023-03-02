import { Icon } from '@chakra-ui/react';
import { BiDoorOpen } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai';

// 2. Use the `as` prop
export const ExitIcon = ({ ...rest }) => {
  return <Icon as={BiDoorOpen} {...rest} />;
};

export const SendIcon = ({ ...rest }) => {
  return <Icon as={AiOutlineSend} {...rest} />;
};
