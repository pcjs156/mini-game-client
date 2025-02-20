import React, { useState } from "react";
import GlobalLayout from "../components/common/GlobalLayout";
import { Box } from "@mui/material";
import RoomList from "components/lounge/RoomList";
import ChatBox from "components/chat/ChatBox";
import { Room } from "types/room";
import { RoomPreviewInfo } from "components/lounge/RoomPreview";
import ChannelSelection from "components/lounge/ChannelSelection";
import ChannelUserList from "components/lounge/ChannelUserList";
import { User } from "types/user";
import CreateRoomButton from "components/lounge/CreateRoomButton";
import MyStatistics from "components/lounge/MyStatistics";

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

const users: User[] = [];
for (let i = 0; i < 17; i++) {
  users.push({
    id: i.toString(),
    nickname: `User ${i}`,
  });
}

export default function Lounge() {
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
        <Box sx={{ width: "20%", borderRight: "1px solid #ccc", p: 2, overflowY: "auto" }}>
          <ChannelSelection />
          <CreateRoomButton />
          <MyStatistics />
          <ChannelUserList users={users} />
        </Box>

        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 3 }}>
          <RoomList
            selectedRooms={selectedRooms}
            currentPage={currentPage}
            totalPages={totalPages}
            handleRoomClick={handleRoomClick}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
          <Box sx={{ flexGrow: 1, mt: 2 }}>
            <ChatBox />
          </Box>
        </Box>
      </Box>
    </GlobalLayout>
  );
}
