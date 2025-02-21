import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { GameType } from "../../../../types/room";

interface MaxParticipantsInputProps {
  gameType: GameType;
  playerCount: number;
  setPlayerCount: (count: number) => void;
}

const fixedMaxParticipants: Record<GameType, number> = {
  "tic-tac-toe": 2,
};

export default function MaxParticipantsInput({ gameType, playerCount, setPlayerCount }: MaxParticipantsInputProps) {
  const [isModifiable, setIsModifiable] = useState<boolean>(true);

  useEffect(() => {
    if (fixedMaxParticipants[gameType]) {
      setPlayerCount(fixedMaxParticipants[gameType]);
      setIsModifiable(false);
    } else {
      setPlayerCount(0);
      setIsModifiable(true);
    }
  }, [gameType, setPlayerCount]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setPlayerCount(Number.parseInt(value));
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="참여 인원"
        value={playerCount}
        onChange={handleChange}
        type="number"
        disabled={!isModifiable}
        inputProps={{ min: 1, max: fixedMaxParticipants[gameType] || 10 }}
        margin="normal"
      />
    </Box>
  );
}
