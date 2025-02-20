import React from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Container, Box, Typography } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeStore } from "../../stores/ui/theme";
import { useAuth } from "hooks/useAuth";
import { useAuthStore } from "stores/auth";

interface GlobalLayoutProps {
  children: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  const { loginUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleThemeChange = (theme: "light" | "dark") => {
    setTheme(theme);
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* 왼쪽: 브랜드 로고 */}
          <Typography variant="h6" component="div">
            Brand Logo
          </Typography>
          {/* 중앙: 네비게이션 바 */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="button">Home</Typography>
            <Typography variant="button">About</Typography>
            <Typography variant="button">Contact</Typography>
          </Box>
          {/* 우측: 사용자 닉네임 */}
          <Typography variant="button">{loginUser?.nickname}</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ flex: 1 }}>{children}</Container>
      <Box component="footer" sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <IconButton edge="end" color="inherit" aria-label="theme" onClick={handleClick}>
          {theme === "light" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => handleThemeChange("light")}>Light Theme</MenuItem>
          <MenuItem onClick={() => handleThemeChange("dark")}>Dark Theme</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default GlobalLayout;
