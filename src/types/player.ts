import { Identifiable, UUID } from ".";

export interface Player extends Identifiable {
  id: UUID;
  nickname: string;
}
