import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../stores/auth";
import authService from "../services/interfaces/IAuthService";
import { LoginResult } from "../services/interfaces/IAuthService";
import { Player } from "../types/player";

export const useAuth = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const loginUser = useUserStore((state) => state.loginUser);
  const setNickname = useUserStore((state) => state.setNickname);
  const _doLogin = useUserStore((state) => state.doLogin);

  const loginMutation = useMutation<LoginResult, Error, string>({
    mutationFn: (nickname: string) => authService.doLogin(nickname),
    onSuccess: (data: LoginResult) => {
      const player = data.loginUserInfo! as Player;
      _doLogin(player.nickname);
    },
    onError: (error: any) => {
      console.error("Login failed:", error.message);
    },
  });

  const login = (nickname: string) => {
    loginMutation.mutate(nickname);
  };

  return { loginUser, setNickname, login, isAuthenticated, loginMutation };
};
