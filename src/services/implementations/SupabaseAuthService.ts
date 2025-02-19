import { supabase } from "../../lib/supabaseClient";
import { IAuthService, LoginResult } from "../interfaces/IAuthService";

export default class SupabaseAuthService implements IAuthService {
  doLogin = async (nickname: string): Promise<LoginResult> => {
    const { data, error } = await supabase
      .from("users")
      .insert({
        nickname,
      })
      .select("uuid, nickname, created_at");

    if (error) {
      return { isSuccessful: false, error: error.message };
    }

    const insertedRow = data?.[0];
    const loginUserInfo = {
      id: insertedRow?.uuid,
      nickname: insertedRow?.nickname,
      createdAt: insertedRow?.created_at,
    };

    return { isSuccessful: true, loginUserInfo };
  };
}
