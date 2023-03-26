import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import Loader from 'components/Loader/Loader';
import { EmojiIcon, SendIcon } from 'components/sheared/customIcons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import { PulseLoader } from 'react-spinners';
import {
  currentRoomSelector,
  isLoadingSelector,
} from 'redux/room/room-selector';
import Message from './Message';
import EmojiPicker from 'emoji-picker-react';
import useChat from 'hooks/useChat';

const Chat = () => {
  const [isEmojiBarOpen, setIsEmojiBarOpen] = useState(false);
  const {
    messages,
    name: roomName,
    residents,
  } = useSelector(currentRoomSelector);
  const { roomId } = useParams();
  const isLoading = useSelector(isLoadingSelector);
  const {
    currentMessage,
    typingResponse,
    sendMessage,
    onEmojiClick,
    authorChecker,
    onMessageTyping,
    handleDisconnect,
  } = useChat(roomId);

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        px={{ base: '3', sm: '10' }}
        py={{ base: '1', sm: '3' }}
        bgColor={'#222222'}
        borderBottom={'4px'}
        borderColor={'purple.700'}
      >
        <Text>
          Room:{' '}
          <Text
            as={'b'}
            fontSize={{ base: 'lg', sm: '2xl' }}
            color={'purple.400'}
          >
            {roomName}
          </Text>
        </Text>
        <Box maxW={'30%'}>
          Users Online:
          <Wrap spacing={5}>
            {residents?.map(({ _id, name }) => (
              <WrapItem key={_id}>
                <Text
                  display={'flex'}
                  alignItems={'center'}
                  fontWeight={'bold'}
                  fontSize={{ base: 'lg', sm: '2xl' }}
                  color={'purple.400'}
                  _before={{
                    content: '""',
                    display: 'inline-block',
                    w: '7px',
                    h: '7px',
                    mr: '5px',
                    borderRadius: '50%',
                    bgColor: 'whatsapp.500',
                  }}
                >
                  {name}
                </Text>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <Button
          colorScheme={'purple'}
          onClick={handleDisconnect}
          size={{ base: 'xs', sm: 'md' }}
        >
          Change Room
        </Button>
      </Box>

      <Box>
        <Box>
          <ScrollToBottom className="scrollToBotom">
            {!isLoading ? (
              <>
                {messages?.length !== 0 ? (
                  <>
                    {messages?.map(({ text, author, _id, createdAt }) => (
                      <Message
                        key={_id}
                        text={text}
                        author={author}
                        authorChecker={authorChecker}
                        createdAt={createdAt}
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
