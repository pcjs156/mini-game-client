import { supabase } from "../../lib/supabaseClient";
import { UUID } from "../../types";
import { IRoomService, CreateRoomParams, CreateRoomResult } from "../interfaces/IRoomService";
import { useAuthStore } from "../../stores/auth";
import { Room } from "types/room";

export default class SupabaseRoomService implements IRoomService {
  getUserIdByUuid = async (uuid: UUID): Promise<number> => {
    const { data, error } = await supabase.from("users").select("id").eq("uuid", uuid).single();
    if (error) {
      throw error;
    } else {
      return data?.id as number;
    }
  };

  createRoom = async (params: CreateRoomParams): Promise<CreateRoomResult> => {
    const loginUser = useAuthStore.getState().loginUser!;
    const userUUID = loginUser.id as UUID;
    const userId = await this.getUserIdByUuid(userUUID);

    const { data, error } = await supabase
      .from("rooms")
      .insert({
        name: params.name,
        type: params.type,
        status: "waiting",
        max_participants: params.maxParticipants,
        is_private: params.isPrivate,
        password: params.password,
        host_id: userId,
      })
      .select("*")
      .single();

    const room: Room = {
      id: data?.uuid as UUID,
      name: data?.name,
      type: data?.type,
      status: data?.status,
      host: loginUser,
      participants: [loginUser],
      maxParticipants: data?.max_participants,
      isPrivate: data?.is_private,
      password: data?.password,
    };

    await supabase.from("users_in_room").insert({
      user_id: userId,
      room_id: data?.id,
      is_host: true,
    });

    return { isSuccessful: !error, room, error: error?.message };
  };
}
