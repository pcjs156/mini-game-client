import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider, SnackbarProviderProps } from "notistack";
import { useThemeStore } from "./stores/ui/theme";
import "./locales/i18n";

import App from "./App";

const queryClient = new QueryClient();

const Root = () => {
  const { theme } = useThemeStore();
  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" } as SnackbarProviderProps["anchorOrigin"]}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Root />);
