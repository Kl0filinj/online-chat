import { Icon } from '@chakra-ui/react';
import { BiDoorOpen } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai';
import { MdOutlineEmojiEmotions } from 'react-icons/md';

// 2. Use the `as` prop
export const ExitIcon = ({ ...rest }) => {
  return <Icon as={BiDoorOpen} {...rest} />;
};

export const SendIcon = ({ ...rest }) => {
  return <Icon as={AiOutlineSend} {...rest} />;
};

export const EmojiIcon = ({ ...rest }) => {
  return <Icon as={MdOutlineEmojiEmotions} {...rest} />;
};
