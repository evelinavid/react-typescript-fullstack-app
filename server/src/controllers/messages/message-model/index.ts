import config from 'config';
import mysql from 'mysql2/promise';

const getChatMessages = async (receiverId: number, senderId: number): Promise<MessageEntity[]> => {
  const connection = await mysql.createConnection(config.database);
  const sql = `
  SELECT 
  messageId,
    receiverId,
    senderId,
    text,
    deliveryDate,
    seen
  FROM message 
  where senderId = ? AND receiverId = ? OR senderId = ? AND receiverId = ?
  ORDER BY deliveryDate ASC
  `;

  const bindings = [
    senderId,
    receiverId,
    receiverId,
    senderId,
  ];

  const [rows] = await connection.query(sql, bindings);
  connection.end();
  return rows as MessageEntity[];
};

const addMessage = async (senderId: number, receiverId: number, text: string): Promise<void> => {
  const connection = await mysql.createConnection(config.database);
  const sql = `
  INSERT INTO message (senderId,receiverId, text) VALUES 
  (?, ?, ?);
  `;
  const bindings = [
    senderId,
    receiverId,
    text,
  ];

  await connection.query(sql, bindings);
  connection.end();
};

const getAllUserChats = async (userId: number): Promise<ChatUser[]> => {
  const connection = await mysql.createConnection(config.database);
  const sql = `
  select 
    u.userId,
    u.name,
    u.image,
    chatUser.newMessages
from 
(SELECT 
  chatUser.userId,
  IF(count(m.seen) > sum(m.seen), 1, 0)  as newMessages
FROM (
  SELECT receiverId as userId
  FROM message
  where senderId = ? 
  group by  receiverId
  UNION 
  SELECT senderId as userId
  FROM message
  where receiverId = ? 
  group by  senderId
) chatUser
left join message as m
on chatUser.userId = m.senderId
group by chatUser.userId
) as chatUser
LEFT JOIN
users as u
on chatUser.userId = u.userId
  `;
  const bindings = [
    userId,
    userId,
  ];
  const [queryResult] = await connection.query(sql, bindings);
  connection.end();
  return queryResult as ChatUser[];
};

const getNewUserChat = async (userId: number): Promise<ChatUser> => {
  const connection = await mysql.createConnection(config.database);
  const [queryResult] = await connection.query(`  
  select 
  u.userId,
  u.name,
  u.image,
  0 as newMessages
from users u
where u.userId = ?`, [userId]);
  connection.end();
  const [chatUser] = queryResult as ChatUser[];
  return chatUser;
};

const MessageModel = {
  getChatMessages,
  addMessage,
  getAllUserChats,
  getNewUserChat,
};

export default MessageModel;
