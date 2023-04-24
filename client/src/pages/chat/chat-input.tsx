import {
  TextField, IconButton, InputAdornment, Button,
} from '@mui/material';

import { Box, Stack } from '@mui/system';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(message);
    setMessage('');
  };

  return (
    <Stack component="form" onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <TextField
          sx={{ flexGrow: 1, height: 60, justifyContent: 'center' }}
          color="secondary"
          variant="standard"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <EmojiEmotionsIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton type="submit" disableRipple><SendIcon /></IconButton>
      </Box>

    </Stack>
  );
};

export default ChatInput;
