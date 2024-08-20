"use client";

import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import PasswordField from "./PasswordField";
import { useState } from "react";

export default function AccountMod() {
  const [currentPass, setCurrentPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [rePass, setRePass] = useState<string>("");

  return (
    <>
      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          Mật khẩu
        </Typography>

        <Box display="flex" flexDirection="column" gap={3} mt={3}>
          <PasswordField
            id="current-password"
            label="Mật khẩu hiện tại"
            variant="outlined"
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
          />
          <PasswordField
            id="new-password"
            label="Mật khẩu mới"
            variant="outlined"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <PasswordField
            id="re-password"
            label="Nhập lại mật khẩu"
            variant="outlined"
            value={rePass}
            onChange={(e) => setRePass(e.target.value)}
          />
        </Box>
      </Box>

      <Box mt={3} display="flex" justifyContent="center">
        <Button variant="contained" color="primary">
          Save
        </Button>
      </Box>

      <Divider sx={{ my: 3, bgcolor: "#938F8E" }} />

      <Box display="flex">
        <Button variant="outlined">Delete my account</Button>
      </Box>
    </>
  );
}
