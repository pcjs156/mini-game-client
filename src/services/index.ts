import SupabaseAuthService from "./implementations/SupabaseAuthService";
import { IAuthService } from "./interfaces/IAuthService";

export const authService: IAuthService = new SupabaseAuthService();
