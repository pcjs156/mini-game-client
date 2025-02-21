import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import TicTacToeTab from "./tabs/TicTacToeTab";
import OtpInput from "../common/input/OtpInput";
import { GameType } from "../../types/room";
import { roomService } from "../../services";
import MaxParticipantsInput from "../lounge/tabs/common/MaxParticipantsInput";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const indexByGameType: Record<GameType, number> = {
  "tic-tac-toe": 0,
};

const DEFAULT_GAME_TYPE: GameType = "tic-tac-toe";

function getGameTypeByIndex(index: number): GameType {
  return Object.keys(indexByGameType)[index] as GameType;
}

export default function CreateRoomButton() {
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [selectedGameType, setSelectedGameType] = useState<GameType>(DEFAULT_GAME_TYPE);
  const [tabIndex, setTabIndex] = useState(indexByGameType[DEFAULT_GAME_TYPE]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState(["", "", "", ""]);
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setSelectedGameType(getGameTypeByIndex(newValue));
  };

  const handleIsPrivateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(event.target.checked);
    if (!event.target.checked) {
      setPassword(["", "", "", ""]);
    }
  };

  const handlePasswordChange = (newPassword: string[]) => {
    setPassword(newPassword);
  };

  const onSubmit = async () => {
    if (!roomName.trim()) {
      setError("방 이름을 입력하세요.");
      return;
    }

    if (isPrivate && password.join("").length !== 4) {
      setError("비공개 방의 경우 4자리 숫자 비밀번호를 입력하세요.");
      return;
    }

    const { isSuccessful, room } = await roomService.createRoom({
      name: roomName,
      type: selectedGameType,
      maxParticipants: playerCount,
      isPrivate,
      password: isPrivate ? password.join("") : undefined,
    });

    if (isSuccessful && room) {
      navigate(`/room/${room.id}`);
    } else {
      setError("방 생성에 실패했습니다.");
    }
  };

  return (
    <>
      <Button sx={{ marginTop: "1rem", width: "100%", padding: 1 }} variant="contained" onClick={handleOpen}>
        방 생성
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
            새 게임
          </Typography>
          <TextField
            fullWidth
            label="방 이름"
            margin="normal"
            required
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <FormControlLabel control={<Checkbox checked={isPrivate} onChange={handleIsPrivateChange} />} label="비공개 방" />
          {isPrivate && (
            <>
              <OtpInput length={4} value={password} onChange={handlePasswordChange} />
              <FormHelperText sx={{ textAlign: "center", mt: 1, color: "gray" }}>4자리 숫자 비밀번호를 입력하세요</FormHelperText>
            </>
          )}
          <MaxParticipantsInput gameType={getGameTypeByIndex(tabIndex)} playerCount={playerCount} setPlayerCount={setPlayerCount} />
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="game type tabs">
            <Tab label="틱택토" />
          </Tabs>
          {tabIndex === 0 && <TicTacToeTab />}
          <Button sx={{ marginTop: "1rem", width: "100%", padding: 1 }} variant="contained" onClick={onSubmit}>
            생성
          </Button>
        </Box>
      </Modal>
    </>
  );
}
