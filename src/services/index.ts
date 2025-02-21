import SupabaseAuthService from "./implementations/SupabaseAuthService";
import { IAuthService } from "./interfaces/IAuthService";

import SupabaseRoomService from "./implementations/SupabaseRoomService";
import { IRoomService } from "./interfaces/IRoomService";

export const authService: IAuthService = new SupabaseAuthService();
export const roomService: IRoomService = new SupabaseRoomService();
