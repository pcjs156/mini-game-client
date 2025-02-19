import React, { FormEvent } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
  nickname: string;
  setNickname: (nickname: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ nickname, setNickname, onSubmit }) => {
  const { t } = useTranslation();

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        width: 300,
        p: 4,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom align="center">
        🕹️ Mini Games 🕹️
      </Typography>
      <TextField
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        name="nickname"
        variant="outlined"
        fullWidth
        margin="normal"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          htmlInput: {
            style: { textAlign: "center" },
          },
        }}
        placeholder={t("auth.login.nicknamePlaceholder")}
        autoFocus
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        {t("auth.login.loginButton")}
      </Button>
    </Box>
  );
};

export default LoginForm;
