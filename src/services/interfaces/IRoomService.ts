import { Room, GameType } from "../../types/room";

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

export interface IRoomService {
  createRoom(params: CreateRoomParams): Promise<CreateRoomResult>;
}
