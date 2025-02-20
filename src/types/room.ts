import { t } from "i18next";

import { Identifiable, UUID } from ".";
import { User } from "./user";

export type GameType = "tic-tac-toe";

export type GameStatus = "waiting" | "playing";
export interface Room extends Identifiable {
  id: UUID;
  name: string;
  type: GameType;
  status: GameStatus;
  host: User;
  participants: User[];
  maxParticipants: number;
  isPrivate: boolean;
  password?: string;
}

export function getGameTypeDisplayName(type: GameType): string {
  switch (type) {
    case "tic-tac-toe":
      return t("game.type.tic-tac-toe");
    default:
      return type;
  }
}
