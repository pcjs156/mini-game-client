import React from "react";
import Box from "@mui/material/Box";
import PlayerCountInput from "./common/MaxParticipantsInput";

const TicTacToeTab: React.FC = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <PlayerCountInput gameType="tic-tac-toe" />
    </Box>
  );
};

export default TicTacToeTab;
