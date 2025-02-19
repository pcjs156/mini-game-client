import { UUID } from "../../types";
import SupabaseAuthService from "../implementations/SupabaseAuthService";

export interface LoginUserInfo {
  id: UUID;
  nickname: string;
  createdAt: string;
}

export interface LoginResult {
  isSuccessful: boolean;
  error?: string;
  loginUserInfo?: LoginUserInfo;
}

export interface IAuthService {
  doLogin(nickname: string): Promise<LoginResult>;
}

const instance: IAuthService = new SupabaseAuthService();
export default instance;
