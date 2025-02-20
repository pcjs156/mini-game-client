import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function MyStatistics() {
  const wins = 10;
  const losses = 5;
  const draws = 2;
  const totalGames = wins + losses + draws;
  const winRate = ((wins / totalGames) * 100).toFixed(2);

  return (
    <Card
      sx={{
        marginTop: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          게임 전적
        </Typography>
        <Box sx={{ marginTop: 1 }}>
          {totalGames}전 / {wins}승 / {losses}패 / {draws}무<Typography variant="body1">Win Rate: {winRate}%</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
