import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider, SnackbarProviderProps } from "notistack";
import "./locales/i18n";

import App from "./App";

const queryClient = new QueryClient();
const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" } as SnackbarProviderProps["anchorOrigin"]}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SnackbarProvider>
  </ThemeProvider>
);
