import React from "react";
import { Box } from "@mui/material";
import LoginForm from "../components/auth/LoginForm";

export default function Home() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <LoginForm />
    </Box>
  );
}
