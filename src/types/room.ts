import { Identifiable, UUID } from ".";
import { Player } from "./player";

export interface Room extends Identifiable {
  id: UUID;
  name: string;
  host: Player;
  participants: Player[];
  maxParticipants: number;
  isPrivate: boolean;
}
