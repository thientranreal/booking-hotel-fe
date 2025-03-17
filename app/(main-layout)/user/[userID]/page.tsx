"use client";

import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserInfo() {
  // State to manage user information
  const [phone, setPhone] = useState("000000000");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate new password inputs
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password should be at least 6 characters long.");
      return;
    }
    setError("");

    // Simulate updating user information (you would likely send this data to an API)
    console.log({
      name,
      email,
      newPassword: newPassword || "No password change",
    });

    // Show success message
    alert("User information updated successfully!");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          maxWidth: 500,
          margin: "auto",
          padding: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Quản lý thông tin
        </Typography>

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Số điện thoại"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Mật khẩu hiện tại"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Mật khẩu mới"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Nhập lại mật khẩu"
            type="password"
            fullWidth
            margin="normal"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ width: "100%", padding: "10px" }}
            >
              Cập nhật thông tin
            </Button>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
