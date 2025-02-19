import React, { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { faker } from "@faker-js/faker";

import { loginSchema } from "../../schemas/auth/loginSchema";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [nickname, setNickname] = React.useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const prefix = faker.color.human();
    const suffix = faker.animal.type();
    setNickname(`${prefix} ${suffix}`);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 입력값 검증 후
    const formData = new FormData(event.currentTarget);
    const validationResult = loginSchema.safeParse(Object.fromEntries(formData));
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      const errorMessages = Object.values(fieldErrors).flat();
      errorMessages.forEach((msg) => enqueueSnackbar(msg, { variant: "error" }));
      return;
    }

    // 유효하면 로그인 처리 후 라운지로 이동
    const validatedData = validationResult.data as { nickname: string };
    login(validatedData.nickname);
    navigate("/lounge");

    closeSnackbar();
    enqueueSnackbar(`Welcome, ${validatedData.nickname}!`, { variant: "success" });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
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
          placeholder="Enter your nickname"
          autoFocus
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </>
  );
};

export default LoginForm;
