import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TicTacToeTab: React.FC = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body1">틱택토 설정</Typography>
      {/* 틱택토 관련 설정 추가 가능 */}
    </Box>
  );
};

export default TicTacToeTab;
