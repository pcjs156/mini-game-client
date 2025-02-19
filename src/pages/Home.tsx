import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { faker } from "@faker-js/faker";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../schemas/auth/loginSchema";

export default function Home() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { login, loginMutation } = useAuth();

  useEffect(() => {
    const prefix = faker.color.human();
    const suffix = faker.animal.type();
    setNickname(`${prefix} ${suffix}`);
  }, []);

  const onLoginFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    // 유효하면 Supabase 로그인 요청
    const validatedData = validationResult.data as { nickname: string };
    login(validatedData.nickname);
  };

  useEffect(() => {
    if (loginMutation.isSuccess) {
      const { nickname } = loginMutation.data!.loginUserInfo!;
      navigate("/lounge");
      closeSnackbar();
      enqueueSnackbar(`Welcome, ${nickname}!`, { variant: "success" });
    }

    if (loginMutation.isError) {
      enqueueSnackbar(loginMutation.error.message, { variant: "error" });
    }
  }, [loginMutation.isSuccess, loginMutation.isError]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <LoginForm nickname={nickname} setNickname={setNickname} onSubmit={onLoginFormSubmit} />
    </Box>
  );
}
