import React from "react";
import GlobalLayout from "../components/GlobalLayout";
import { useAuthStore } from "../stores/auth";

export default function Lounge() {
  const { loginUser } = useAuthStore();
  return (
    <GlobalLayout>
      <h1>Current User: {loginUser!.nickname}</h1>
    </GlobalLayout>
  );
}
