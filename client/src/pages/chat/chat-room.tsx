import React from 'react';
import {
  Box, Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ChatInput from 'pages/chat/chat-input';
import ReceiverChatMessage from 'pages/chat/receiver-chat-message';
import SenderChatMessage from 'pages/chat/sender-chat-message';
import MessageService from 'services/message-service';
import { useAppSelector } from 'redux/store/store';
import { Stack } from '@mui/system';
import RedirectToLogin from 'components/redirect';

type ChatRoomProps = {
  receiver: ChatUser | null,
};

const ChatRoom: React.FC<ChatRoomProps> = ({ receiver }) => {
  const { user } = useAppSelector((state) => state.users);
  const [messages, setMessages] = React.useState<MessageEntity[]>([]);
  React.useEffect(() => {
    if (receiver !== null) {
      (async () => {
        const fetchedMessages = await MessageService.fetchChatMessages(receiver.userId);
        setMessages(fetchedMessages);
      })();
    }
  }, [receiver]);

  if (user === null) return <RedirectToLogin />;
  if (receiver === null) return <div />;

  const handleAddMessage = async (message: string) => {
    await MessageService.addChatMessage(receiver.userId, message);
    const fetchedMessages = await MessageService.fetchChatMessages(receiver.userId);
    setMessages(fetchedMessages);
  };

  return (
    <Box sx={{
      flexGrow: 2,
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <Box
        sx={{
          flexGrow: 1,
          border: 'solid 2px #EEE3CB',
          display: 'flex',
          flexDirection: 'column',
        }}
        component="div"
      >
        <Box sx={{
          height: 55, display: 'flex', justifyContent: 'center', padding: 1, borderBottom: '2px solid #EEE3CB ', position: 'sticky', top: 0, bgcolor: 'white', zIndex: 2000,
        }}
        >
          <Avatar src={receiver.image} />
          <Typography sx={{ alignSelf: 'center', marginLeft: 2 }}>{receiver.name}</Typography>

        </Box>
        <Stack sx={{
          height: 400,
          overflowY: 'auto',
          display: 'flex',
        }}
        >
          {messages.map((msg) => (msg.receiverId === user.userId ? (
            <Box
              key={msg.messageId}
              sx={{
                alignSelf: 'self-start', maxWidth: 450, minWidth: 170, m: 2,
              }}
            >
              <ReceiverChatMessage
                image={receiver.image}
                createdAt={msg.deliveryDate}
                text={msg.text}
              />
            </Box>
          ) : (
            <Box
              key={msg.messageId}
              sx={{
                alignSelf: 'self-end', maxWidth: 450, minWidth: 170, margin: 2,
              }}
            >
              <SenderChatMessage
                image={user.image}
                createdAt={msg.deliveryDate}
                text={msg.text}
              />
            </Box>
          )))}
        </Stack>
      </Box>
      <ChatInput onSubmit={handleAddMessage} />
    </Box>
  );
};

export default ChatRoom;
