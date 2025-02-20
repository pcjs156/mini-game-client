import React from "react";
import { AppBar, Toolbar, IconButton, Box, Typography, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeStore } from "../../stores/ui/theme";
import { useAuthStore } from "stores/auth";

interface GlobalLayoutProps {
  children: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  const { loginUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const muiTheme = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ height: "64px" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Brand Logo
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="button">Home</Typography>
            <Typography variant="button">About</Typography>
            <Typography variant="button">Contact</Typography>
          </Box>
          <Typography variant="button">{loginUser?.nickname}</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, p: 0, overflow: "auto" }}>{children}</Box>
      <Box
        component="footer"
        sx={{
          p: 2,
          mt: "auto",
          backgroundColor: muiTheme.palette.background.default,
          color: muiTheme.palette.text.primary,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2">© Developed by pcjs156</Typography>
        <IconButton color="inherit" onClick={toggleTheme}>
          {theme === "light" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default GlobalLayout;
