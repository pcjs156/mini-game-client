import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, TextField, Button, Fab } from "@mui/material";
import ChatMessageBubble from "./ChatMessageBubble";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface ChatMessage {
  id: number;
  sentBy: string;
  content: string;
  isMyMessage: boolean;
  isRead: boolean;
}

const generateDummyChattingData = (count: number): ChatMessage[] => {
  return Array.from({ length: count }, (_, cnt) => {
    const isMyMessage = Math.random() > 0.5;
    return {
      id: cnt,
      sentBy: isMyMessage ? "CurrentUser" : "OtherUser",
      content: `Message ${cnt}`,
      isMyMessage,
      isRead: true,
    };
  });
};

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(generateDummyChattingData(100));
  const [newMessage, setNewMessage] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback((behavior: ScrollBehavior) => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObj: ChatMessage = {
        id: messages.length + 1,
        sentBy: "CurrentUser",
        content: newMessage,
        isMyMessage: true,
        isRead: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      setNewMessage("");
    }
  };

  const isScrolledToBottom = () => {
    const chatBox = chatBoxRef.current;
    if (!chatBox) return false;
    return chatBox.scrollHeight - chatBox.clientHeight <= chatBox.scrollTop + 1;
  };

  const handleReceiveMessage = () => {
    const newMessageObj: ChatMessage = {
      id: messages.length + 1,
      sentBy: "OtherUser",
      content: `Message ${messages.length + 1}`,
      isMyMessage: false,
      isRead: false,
    };
    setMessages((prevMessages) => [...prevMessages, newMessageObj]);
  };

  useEffect(() => {
    const interval = setInterval(handleReceiveMessage, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom("auto");
  }, [scrollToBottom]);

  useEffect(() => {
    const chatBox = chatBoxRef.current;
    if (chatBox) {
      const handleScroll = () => {
        setShowScrollButton(!isScrolledToBottom());
      };

      chatBox.addEventListener("scroll", handleScroll);
      return () => chatBox.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "20rem",
        maxHeight: "20rem",
        border: "1px solid #ccc",
        borderRadius: 3,
        position: "relative",
      }}
    >
      <Box ref={chatBoxRef} sx={{ flexGrow: 1, overflowY: "scroll", p: 2 }}>
        {messages.map((msg, index) => (
          <ChatMessageBubble
            key={msg.id}
            id={`message-${msg.id}`}
            sentBy={msg.sentBy}
            content={msg.content}
            isMyMessage={msg.isMyMessage}
            isLastMessage={index === messages.length - 1}
          />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ display: "flex", p: 2, borderTop: "1px solid #ccc" }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button variant="contained" onClick={handleSendMessage} sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
      {showScrollButton && (
        <Fab
          color="primary"
          size="small"
          onClick={() => scrollToBottom("smooth")}
          sx={{
            position: "absolute",
            bottom: 90,
            right: 16,
          }}
        >
          <ArrowDownwardIcon />
        </Fab>
      )}
    </Box>
  );
};

export default ChatBox;
