"use client";

import { Button, TextField, Grid, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validateEmail, validatePhoneNumber } from "@/utils/validators";
import { LoadingButton } from "@mui/lab";
import { userCreate, userLogout } from "@/app/api/user";
import { toast } from "react-toastify";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const queryParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      email === "" ||
      name === "" ||
      phone === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("Chưa nhập đủ thông tin!");
    } else if (password !== confirmPassword) {
      setError("Mật khẩu không khớp!");
    } else if (!validateEmail(email)) {
      setError("Email không hợp lệ!");
    } else if (!validatePhoneNumber(phone)) {
      setError("Số điện thoại không hợp lệ!");
    } else {
      setError("");
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (isLoading) {
      const registerUser = async () => {
        const data = await userCreate(email, name, phone, password);
        console.log(data);

        if (data.errors) {
          const errorMsg = data.errors[0].message;
          toast.error(errorMsg);
        } else {
          toast.success("Tạo tài khoản thành công");

          // Logout current user if exist
          await userLogout();

          const redirect = queryParams.get("redirect");

          router.push(
            redirect
              ? `/login?redirect=${encodeURIComponent(redirect)}`
              : "/login"
          );
        }

        setIsLoading(false);
      };

      registerUser();
    }
  }, [isLoading]);

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Đăng ký
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Tên"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Số điện thoại"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <TextField
          label="Mật khẩu"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Nhập lại mật khẩu"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <LoadingButton
          loading={isLoading}
          loadingPosition="end"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
        >
          Đăng ký
        </LoadingButton>
      </form>
      <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
        <Grid item>
          <Button onClick={() => router.push("/login")}>
            Đã có tài khoản? Đăng nhập
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
