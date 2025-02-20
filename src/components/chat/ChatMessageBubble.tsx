import React from "react";
import { Box, Typography } from "@mui/material";

interface ChatMessageBubbleProps {
  id: string;
  sentBy: string;
  content: string;
  isMyMessage: boolean;
  isLastMessage: boolean;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ sentBy, content, isMyMessage, isLastMessage }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isMyMessage ? "flex-end" : "flex-start",
        mb: isLastMessage ? 0 : 2,
        maxWidth: "30rem",
        ml: isMyMessage ? "auto" : 0,
      }}
    >
      {!isMyMessage && (
        <Typography variant="caption" sx={{ color: "gray" }}>
          {sentBy}
        </Typography>
      )}
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: isMyMessage ? "#dcf8c6" : "#f1f1f1",
          wordBreak: "break-word",
        }}
      >
        <Typography variant="body2">{content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatMessageBubble;
