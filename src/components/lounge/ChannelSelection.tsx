import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

export default function ChannelSelection() {
  const [channel, setChannel] = useState("Channel 01");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setChannel(event.target.value as string);
  };

  return (
    <FormControl
      variant="outlined"
      fullWidth
      sx={{
        mt: 2,
      }}
    >
      <InputLabel id="channel-select-label">Channel</InputLabel>
      <Select labelId="channel-select-label" id="channel-select" value={channel} onChange={handleChange} label="Channel">
        {Array.from({ length: 10 }, (_, index) => (
          <MenuItem key={index} value={`Channel ${String(index + 1).padStart(2, "0")}`}>
            {`Channel ${String(index + 1).padStart(2, "0")}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
