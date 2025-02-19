import { Identifiable, UUID } from ".";

export interface User extends Identifiable {
  id: UUID;
  nickname: string;
}
