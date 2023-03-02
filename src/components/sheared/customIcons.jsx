import { Icon } from '@chakra-ui/react';
import { BiDoorOpen } from 'react-icons/bi';

// 2. Use the `as` prop
export const ExitIcon = ({ ...rest }) => {
  return <Icon as={BiDoorOpen} {...rest} />;
};
