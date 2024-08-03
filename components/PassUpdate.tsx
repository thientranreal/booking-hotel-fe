import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import PasswordField from "./PasswordField";
import handleEnterKey from "../utils/handleEnterKey";

const PassUpdate = () => {
  const [currentPass, setCurrentPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [confirmedNewPass, setConfirmedNewPass] = useState<string>("");

  const saveBtnRef = useRef<HTMLButtonElement>(null);

  const handleSaveBtn = () => {
    console.log("Hello");
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Cập nhật mật khẩu
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack spacing={3}>
          <PasswordField
            id="currentPass"
            label="Mật khẩu hiện tại"
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
            onKeyDown={(e) => handleEnterKey(e, saveBtnRef)}
          />

          <PasswordField
            id="newPass"
            label="Mật khẩu mới"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            onKeyDown={(e) => handleEnterKey(e, saveBtnRef)}
          />

          <PasswordField
            id="confirmedNewPass"
            label="Nhập lại mật khẩu mới"
            value={confirmedNewPass}
            onChange={(e) => setConfirmedNewPass(e.target.value)}
            onKeyDown={(e) => handleEnterKey(e, saveBtnRef)}
          />
        </Stack>
        <Divider sx={{ mt: 5, mb: 2 }} />
        <Stack spacing={2} direction="row" justifyContent="flex-end">
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Xóa
          </Button>
          <LoadingButton
            loading={false}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            ref={saveBtnRef}
            onClick={handleSaveBtn}
          >
            Lưu lại
          </LoadingButton>
        </Stack>
      </Paper>
    </Box>
  );
};

export default PassUpdate;
