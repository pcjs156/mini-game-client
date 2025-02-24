import { Room, GameType } from "../../types/room";
import { IGenericService } from "./IGenericService";

export interface CreateRoomParams {
  name: string;
  type: GameType;
  maxParticipants: number;
  isPrivate: boolean;
  password?: string;
}

export interface CreateRoomResult {
  isSuccessful: boolean;
  error?: string;
  room?: Room;
}

export interface IRoomService extends IGenericService<Room> {
  createRoom(params: CreateRoomParams): Promise<CreateRoomResult>;
}
