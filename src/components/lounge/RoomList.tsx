import React from "react";
import { Box, Button } from "@mui/material";
import LoungeRoomPreview, { RoomPreviewInfo } from "components/lounge/RoomPreview";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Room } from "types/room";

interface RoomListProps {
  selectedRooms: RoomPreviewInfo[];
  currentPage: number;
  totalPages: number;
  handleRoomClick: (room: Room) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const RoomList: React.FC<RoomListProps> = ({
  selectedRooms,
  currentPage,
  totalPages,
  handleRoomClick,
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <Box sx={{ border: "1px solid #ccc", borderRadius: 3, p: 3 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
        {selectedRooms.map((previewInfo, index) => (
          <LoungeRoomPreview key={index} roomPreviewInfo={previewInfo} onClick={() => handleRoomClick(previewInfo.room)} />
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="contained" sx={{ minWidth: "40px" }} onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ArrowBackIcon />
        </Button>
        <Button variant="contained" sx={{ minWidth: "40px", ml: 1 }} onClick={handleNextPage} disabled={currentPage === totalPages}>
          <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default RoomList;
