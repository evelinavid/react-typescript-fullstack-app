import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8028',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const fetchChatMessages = async (receiverId: number) => {
  const token = localStorage.getItem('token');
  if (token === null) throw new Error('Token expired');
  const response = await api.get<MessageEntity[]>(`/api/messages?receiverId=${receiverId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const addChatMessage = async (receiverId: number, text: string) => {
  const token = localStorage.getItem('token');
  if (token === null) throw new Error('Token expired');
  await api.post('/api/messages/add', {
    receiverId,
    text,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const fetchAllUserChats = async () => {
  const token = localStorage.getItem('token');
  if (token === null) throw new Error('Token expired');
  const response = await api.get<ChatUser[]>('/api/messages/user-chats', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const fetchUserChat = async (id:number) => {
  const token = localStorage.getItem('token');
  if (token === null) throw new Error('Token expired');
  const response = await api.get<ChatUser>(`/api/messages/user-chat?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const MessageService = {
  fetchChatMessages,
  addChatMessage,
  fetchAllUserChats,
  fetchUserChat,
};

export default MessageService;
