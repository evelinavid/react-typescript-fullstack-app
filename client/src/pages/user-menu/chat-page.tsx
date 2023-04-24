import {
  Box, Button, Container, Typography,
} from '@mui/material';
import React from 'react';
import Avatar from '@mui/material/Avatar';

import MessageService from 'services/message-service';
import ChatRoom from 'pages/chat/chat-room';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/store/store';

const ChatPage = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.users);
  const [chats, setChats] = React.useState<ChatUser[]>([]);
  const [activeChatUser, setActiveChatUser] = React.useState<ChatUser | null>(null);

  React.useEffect(() => {
    (async () => {
      const fetchChatUsers = await MessageService.fetchAllUserChats();
      if (id !== undefined) {
        const userChat = await MessageService.fetchUserChat(Number(id));
        if (fetchChatUsers.every((x) => x.userId !== Number(id))) {
          if (user?.userId !== Number(id)) {
            fetchChatUsers.splice(0, 0, userChat);
          }
        }
        setActiveChatUser(userChat);
      }
      setChats(fetchChatUsers);
    })();
  }, []);

  return (
    <Container sx={{
      display: 'flex', m: 'auto', padding: 2, boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px ',
    }}
    >
      <Box sx={{
        border: 'solid 2px none',
        borderColor: 'theme.palette.primary.main',
        width: 350,
        height: 500,
        flexShrink: 0,
      }}
      >
        Chat
        {chats.map((chatsData) => (
          <Button
            key={chatsData.userId}
            sx={{
              height: 80, display: 'flex', padding: 1, borderBottom: '2px solid #EEE3CB ', textTransform: 'none', color: 'black',
            }}
            onClick={() => setActiveChatUser(chatsData)}
          >

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Avatar src={chatsData.image} />
              <Typography>{chatsData.name}</Typography>
            </Box>
            <Box sx={{ display: 'inline-flex' }}>
              <Typography sx={{ alignSelf: 'center', paddingLeft: 5 }}>{chatsData.newMessages !== 0 ? 'You have one message' : 'No new messages'}</Typography>
            </Box>
          </Button>
        ))}
      </Box>
      <ChatRoom receiver={activeChatUser} />
    </Container>
  );
};
export default ChatPage;
