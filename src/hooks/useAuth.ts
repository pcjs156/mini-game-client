import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth";
import { authService } from "../services";
import { LoginResult } from "../services/interfaces/IAuthService";
import { User } from "../types/user";

export const useAuth = () => {
  const setUser = useAuthStore((state) => state.setLoginUser);
  const resetUser = useAuthStore((state) => state.resetLoginUser);

  const loginMutation = useMutation<LoginResult, Error, string>({
    mutationFn: (nickname: string) => authService.doLogin(nickname),
    onSuccess: (data: LoginResult) => {
      const player = data.loginUserInfo! as User;
      setUser(player);
    },
    onError: (error: any) => {
      console.error("Login failed:", error.message);
      resetUser();
    },
  });

  return { loginMutation };
};
