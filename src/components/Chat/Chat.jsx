import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
// import { v4 as uuidv4 } from 'uuid';
import Loader from 'components/Loader/Loader';
import { EmojiIcon, SendIcon } from 'components/sheared/customIcons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import { PulseLoader } from 'react-spinners';
import {
  currentRoomSelector,
  isLoadingSelector,
} from 'redux/room/room-selector';
import Message from './Message';
import EmojiPicker from 'emoji-picker-react';
import useChat from 'hooks/useChat';
// import warningToast from 'components/sheared/Toasts/warningToast';

const Chat = () => {
  const [isEmojiBarOpen, setIsEmojiBarOpen] = useState(false);
  const { messages, name: roomName } = useSelector(currentRoomSelector);
  const { roomId } = useParams();
  const isLoading = useSelector(isLoadingSelector);
  const {
    currentMessage,
    typingResponse,
    sendMessage,
    onEmojiClick,
    authorChecker,
    onMessageTyping,
  } = useChat(roomId);
  // const getMessageTime = iso => {
  //   const dateObj = new Date(iso);
  //   const hour = dateObj.getUTCHours();
  //   const minute = dateObj.getUTCMinutes();
  //   return `${hour}:${minute}`;
  // };

  const handleDisconnect = () => {
    // warningToast(`User ${name} left the chat !`, {
    //   autoClose: 30000,
    // });
    // socket.emit('leaveRoom', roomId);
    console.log('USER LEFT ROOM');
  };

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        px={'10'}
        py={'3'}
        bgColor={'#222222'}
        borderBottom={'4px'}
        borderColor={'purple.700'}
      >
        <Text>
          Room:{' '}
          <Text as={'b'} fontSize={'xl'}>
            {roomName}
          </Text>
        </Text>
        <Button colorScheme={'purple'} onClick={handleDisconnect}>
          <Link to={'/rooms'}>Change Room</Link>
        </Button>
      </Box>

      <Box>
        <Box>
          <ScrollToBottom className="scrollToBotom">
            {!isLoading ? (
              <>
                {messages?.length !== 0 ? (
                  <>
                    {messages?.map(({ text, author, _id }) => (
                      <Message
                        key={_id}
                        text={text}
                        author={author}
                        authorChecker={authorChecker}
                      />
                    ))}
                    {typingResponse !== '' && (
                      <Box maxW={'50%'} w={'max-content'} ml={'none'} p={'4'}>
                        <Box bgColor={'gray.600'} borderRadius={'sm'}>
                          <Text p={'3'} lineHeight={'1.2'} as={'span'}>
                            {typingResponse}{' '}
                            <PulseLoader color="#805AD5" size="9px" />
                          </Text>
                        </Box>
                      </Box>
                    )}
                  </>
                ) : (
                  <Heading>There is no messages, be the first one ^_^</Heading>
                )}
              </>
            ) : (
              <Loader />
            )}
          </ScrollToBottom>
        </Box>
        <Box display={'flex'} bgColor={'#222222'}>
          <InputGroup size="md">
            <Input
              variant={'filled'}
              borderRadius={'xl'}
              value={currentMessage}
              onChange={evt => onMessageTyping(evt.target.value)}
              placeholder="Enter message..."
            />

            <InputRightElement
              width="4.5rem"
              pr={'16'}
              children={
                <>
                  <IconButton
                    aria-label="Send message"
                    icon={
                      <SendIcon
                        transitionProperty={'fill'}
                        transitionDuration={'250ms'}
                        transitionTimingFunction={
                          'cubic-bezier(0.4, 0, 0.2, 1)'
                        }
                        _hover={{
                          fill: 'purple.500',
                        }}
                      />
                    }
                    variant={'unstyled'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    isDisabled={currentMessage === ''}
                    onClick={() => sendMessage(currentMessage)}
                  />
                  <IconButton
                    aria-label="Pick emoji"
                    icon={
                      <EmojiIcon
                        transitionProperty={'fill'}
                        transitionDuration={'250ms'}
                        transitionTimingFunction={
                          'cubic-bezier(0.4, 0, 0.2, 1)'
                        }
                        _hover={{
                          fill: 'purple.500',
                        }}
                      />
                    }
                    variant={'unstyled'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    onClick={() => setIsEmojiBarOpen(!isEmojiBarOpen)}
                  />
                </>
              }
            />
            {isEmojiBarOpen && (
              <Box position={'absolute'} right={'0'} bottom={'100%'}>
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  lazyLoadEmojis={true}
                  searchDisabled={true}
                />
              </Box>
            )}
          </InputGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
