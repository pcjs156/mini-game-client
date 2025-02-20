import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import { Room } from "types/room";
import GlobalLayout from "../components/common/GlobalLayout";
import RoomList from "components/lounge/RoomList";
import { RoomPreviewInfo } from "components/lounge/RoomPreview";

function getDummyRoomPreviewInfoListData(numOfRooms: number): RoomPreviewInfo[] {
  const result: RoomPreviewInfo[] = [];
  for (let i = 0; i < numOfRooms; i++) {
    const roomId = Math.floor(Math.random() * 1e10).toString();
    const info: RoomPreviewInfo = {
      room: {
        id: roomId,
        name: `Room ${roomId}`,
        type: "tic-tac-toe",
        status: Math.random() > 0.5 ? "waiting" : "playing",
        host: { id: roomId, nickname: `Host ${roomId}` },
        participants: [{ id: roomId, nickname: `Participant ${roomId}` }],
        maxParticipants: 2,
        isPrivate: Math.random() > 0.5,
      },
      isPlaceholder: false,
    };
    result.push(info);
  }
  return result;
}

function addEmptySlots(selectedRooms: RoomPreviewInfo[], roomsPerPage: number): RoomPreviewInfo[] {
  const emptySlots = roomsPerPage - selectedRooms.length;
  for (let i = 0; i < emptySlots; i++) {
    selectedRooms.push({
      room: {
        id: `empty-${i}`,
        name: "Empty",
        type: "tic-tac-toe",
        status: "waiting",
        host: { id: `empty-${i}`, nickname: "Empty" },
        participants: [],
        maxParticipants: 2,
        isPrivate: false,
      },
      isPlaceholder: true,
    });
  }
  return selectedRooms;
}

export default function Lounge() {
  const users = ["User1", "User2", "User3"];
  const roomPreviewInfoList: RoomPreviewInfo[] = getDummyRoomPreviewInfoListData(19);

  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 8;
  const totalPages = Math.ceil(roomPreviewInfoList.length / roomsPerPage);

  const handleRoomClick = (room: Room) => {
    console.log(`Room clicked: ${room.name}`);
    // 추가적인 클릭 처리 로직을 여기에 작성하세요.
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * roomsPerPage;
  const selectedRooms = roomPreviewInfoList.slice(startIndex, startIndex + roomsPerPage);

  // 빈 방을 채우기 위한 더미 요소 추가
  addEmptySlots(selectedRooms, roomsPerPage);

  return (
    <GlobalLayout>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ width: "20%", borderRight: "1px solid #ccc", p: 2, height: "100vh", overflowY: "auto" }}>
          <Typography variant="h6">Users in Lounge</Typography>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </Box>

        <Box sx={{ flexGrow: 1, p: 2, padding: "3%" }}>
          <RoomList
            selectedRooms={selectedRooms}
            currentPage={currentPage}
            totalPages={totalPages}
            handleRoomClick={handleRoomClick}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        </Box>
      </Box>
    </GlobalLayout>
  );
}
