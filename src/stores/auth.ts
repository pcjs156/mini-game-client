import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { User } from "../types/user";

interface AuthState {
  isAuthenticated: boolean;
  loginUser: User | null;
  setLoginUser: (loginUser: User) => void;
  resetLoginUser: () => void;
  setLoginUserNickname: (nickname: string) => void;
}

export const useAuthStore = create(
  immer<AuthState>((set) => ({
    isAuthenticated: false,
    loginUser: null as User | null,
    setLoginUser: (loginUser: User) =>
      set((state) => {
        state.isAuthenticated = true;
        state.loginUser = loginUser;
      }),
    resetLoginUser: () =>
      set((state) => {
        state.isAuthenticated = false;
        state.loginUser = null;
      }),
    setLoginUserNickname: (nickname: string) =>
      set((state) => {
        if (state.loginUser) {
          state.loginUser.nickname = nickname;
        }
      }),
  }))
);
