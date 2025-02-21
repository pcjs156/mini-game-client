import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface OtpInputProps {
  length: number;
  value: string[];
  onChange: (value: string[]) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, value, onChange }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (/^\d?$/.test(newValue)) {
      const newOtp = [...value];
      newOtp[index] = newValue;
      onChange(newOtp);

      // Move focus to the next input
      if (newValue && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
      {Array.from({ length }).map((_, index) => (
        <TextField
          key={index}
          value={value[index]}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
          inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
          sx={{ width: "3rem" }}
          inputRef={(el) => (inputsRef.current[index] = el)}
        />
      ))}
    </Box>
  );
};

export default OtpInput;
