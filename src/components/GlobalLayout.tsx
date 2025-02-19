import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, Container } from "@mui/material";
import { useAuthStore } from "../stores/auth";

interface GlobalLayoutProps {
  children: React.ReactNode;
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  const { loginUser } = useAuthStore();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* 서비스 로고 */}
          <Typography variant="h6" component="div">
            My Game App
          </Typography>

          {/* 네비게이션 바 */}
          <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Games</Button>
            <Button color="inherit">About</Button>
          </Box>

          {/* 접속 중인 사용자 정보 */}
          <Typography variant="body1" component="div" sx={{ visibility: loginUser ? "visible" : "hidden" }}>
            {loginUser ? loginUser.nickname : " "}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Box component="footer" sx={{ textAlign: "center", py: 2, bgcolor: "primary.main", color: "white" }}>
        <Typography variant="body2">
          made by{" "}
          <a href="https://github.com/pcjs156" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
            @pcjs156
          </a>
        </Typography>
      </Box>
    </Box>
  );
}
