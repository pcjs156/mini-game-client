import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import { Room, getGameTypeDisplayName } from "types/room";

export interface RoomPreviewInfo {
  room: Room;
  isPlaceholder: boolean;
}

export interface LoungeRoomPreviewProps {
  roomPreviewInfo: RoomPreviewInfo;
  onClick: () => void;
}

export default function LoungeRoomPreview({ roomPreviewInfo, onClick }: LoungeRoomPreviewProps) {
  const { room, isPlaceholder } = roomPreviewInfo;
  const isPlaying = room.status === "playing";
  const gameTypeDisplayName = getGameTypeDisplayName(room.type);

  return (
    <Box
      sx={{
        border: isPlaceholder ? "none" : "1px solid #ccc",
        p: isPlaceholder ? 0 : 2.5,
        borderRadius: isPlaceholder ? 0 : 3,
        position: "relative",
        cursor: isPlaying || isPlaceholder ? "not-allowed" : "pointer",
        opacity: isPlaying ? 0.5 : 1,
        backgroundColor: isPlaceholder ? "transparent" : "inherit",
        minHeight: "5.5rem",
        "&:hover": {
          boxShadow: isPlaying || isPlaceholder ? "none" : "5px 5px 10px rgba(0, 0, 0, 0.2)",
        },
        visibility: isPlaceholder ? "hidden" : "visible",
      }}
      onClick={!isPlaying && !isPlaceholder ? onClick : undefined}
    >
      {!isPlaceholder && (
        <>
          {room.isPrivate && <LockIcon sx={{ position: "absolute", top: 8, right: 8 }} />}
          <Typography variant="body1">{room.name}</Typography>
          <Typography variant="body2">
            <b>{gameTypeDisplayName}</b> <span style={{ fontSize: "0.7rem", color: "darkgray" }}>(N명 / {room.maxParticipants})</span>
          </Typography>
        </>
      )}
    </Box>
  );
}
