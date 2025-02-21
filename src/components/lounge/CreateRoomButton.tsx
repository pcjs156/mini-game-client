import React, { useState } from "react";
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

export default function CreateRoomButton() {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState(["", "", "", ""]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
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
          <TextField fullWidth label="방 이름" margin="normal" required />
          <FormControlLabel control={<Checkbox checked={isPrivate} onChange={handleIsPrivateChange} />} label="비공개 방" />
          {isPrivate && (
            <>
              <OtpInput length={4} value={password} onChange={handlePasswordChange} />
              <FormHelperText sx={{ textAlign: "center", mt: 1, color: "gray" }}>4자리 숫자 비밀번호를 입력하세요</FormHelperText>
            </>
          )}
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="game type tabs">
            <Tab label="틱택토" />
            {/* 다른 게임 유형 탭 추가 가능 */}
          </Tabs>
          {tabIndex === 0 && <TicTacToeTab />}
          {/* 다른 게임 유형 탭 컴포넌트 추가 가능 */}
          <Button sx={{ marginTop: "1rem", width: "100%", padding: 1 }} variant="contained">
            생성
          </Button>
        </Box>
      </Modal>
    </>
  );
}
