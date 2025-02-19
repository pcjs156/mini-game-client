import { useUserStore } from "../stores/auth";

export const useAuth = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const loginUser = useUserStore((state) => state.loginUser);
  const setNickname = useUserStore((state) => state.setNickname);
  const _doLogin = useUserStore((state) => state.doLogin);

  const login = (nickname: string) => {
    _doLogin(nickname);
  };

  return { loginUser, setNickname, login, isAuthenticated };
};
