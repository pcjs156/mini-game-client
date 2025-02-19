import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import { SnackbarProvider } from "notistack";

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <App />
    </SnackbarProvider>
  </ThemeProvider>
);
