import { create } from "zustand";

import { Player } from "../types/player";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  isAuthenticated: boolean;
  loginUser: Player | null;
  doLogin: (nickname: string) => void;
  doLogout: () => void;
  setNickname: (nickname: string) => void;
}

export const useUserStore = create(
  immer<AuthState>((set) => ({
    isAuthenticated: false,
    loginUser: null as Player | null,
    doLogin: (nickname: string) =>
      set((state) => {
        state.isAuthenticated = true;
        state.loginUser = { id: "", nickname };
      }),
    doLogout: () =>
      set((state) => {
        state.isAuthenticated = false;
        state.loginUser = null;
      }),
    setNickname: (nickname: string) =>
      set((state) => {
        if (state.loginUser) {
          state.loginUser.nickname = nickname;
        }
      }),
  }))
);
