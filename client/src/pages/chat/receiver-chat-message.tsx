import { Box, Typography } from '@mui/material';
import React from 'react';
import Avatar from '@mui/material/Avatar';

interface ChatMessageProps {
  text: string;
  createdAt: string,
  image: string | null,
}

const ReceiverChatMessage: React.FC<ChatMessageProps> = ({ text, createdAt, image }) => (
  <Box sx={{
    border: ' 2px solid #B7C4CF', display: 'flex', flexDirection: 'column', borderRadius: '7px 7px', padding: 1,
  }}
  >
    <Box sx={{ display: 'inline-flex' }}>

      <Avatar sx={{ height: '25px', width: '25px', marginRight: 1 }} src={image ?? ''} />
      {text}
    </Box>
    <Typography variant="caption">{createdAt}</Typography>
  </Box>
);

export default ReceiverChatMessage;
