import { Identifiable, UUID } from ".";
import { User } from "./user";

export interface Room extends Identifiable {
  id: UUID;
  name: string;
  host: User;
  participants: User[];
  maxParticipants: number;
  isPrivate: boolean;
}
