import React from "react";
import { Box, Typography } from "@mui/material";

interface ChatMessageBubbleProps {
  id: string;
  sentBy: string;
  content: string;
  isMyMessage: boolean;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ sentBy, content, isMyMessage }) => {
  const alignment = isMyMessage ? "flex-end" : "flex-start";
  const marginLeft = isMyMessage ? "auto" : 0;
  const backgroundColor = isMyMessage ? "#dcf8c6" : "#f1f1f1";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: alignment,
        mb: 2,
        maxWidth: "30rem",
        ml: marginLeft,
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
          backgroundColor: backgroundColor,
          wordBreak: "break-word",
        }}
      >
        <Typography variant="body2">{content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatMessageBubble;
