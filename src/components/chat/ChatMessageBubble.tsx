import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface ChatMessageBubbleProps {
  id: string;
  sentBy: string;
  content: string;
  isMyMessage: boolean;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ sentBy, content, isMyMessage }) => {
  const theme = useTheme();
  const alignment = isMyMessage ? "flex-end" : "flex-start";
  const marginLeft = isMyMessage ? "auto" : 0;
  const backgroundColor = isMyMessage ? theme.palette.primary.light : theme.palette.background.paper;
  const textColor = isMyMessage ? theme.palette.primary.contrastText : theme.palette.text.primary;

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
        <Typography variant="body2" sx={{ color: textColor }}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessageBubble;
