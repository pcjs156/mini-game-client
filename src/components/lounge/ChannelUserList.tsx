import React, { useState } from "react";
import { User } from "types/user";
import { IconButton, Box, Typography, List, ListItem, Paper } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface ChannelUserListProps {
  users: User[];
}

const USERS_PER_PAGE = 10;

export default function ChannelUserList({ users }: ChannelUserListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const selectedUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, marginTop: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Typography variant="body2" color="textSecondary">
          {currentPage} / {totalPages}
        </Typography>
      </Box>
      <List sx={{ minHeight: "23rem", maxHeight: "23rem", overflow: "auto" }}>
        {selectedUsers.map((user) => (
          <ListItem key={user.id} sx={{ borderBottom: "1px solid lightgray" }}>
            {user.nickname}
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ArrowBack />
        </IconButton>
        <IconButton onClick={handleNextPage} disabled={currentPage === totalPages}>
          <ArrowForward />
        </IconButton>
      </Box>
    </Paper>
  );
}
