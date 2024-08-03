"use client";

import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import PasswordField from "./PasswordField";
import { useRef, useState, MouseEventHandler } from "react";
import { validateEmail } from "../utils/validators";
import handleEnterKey from "../utils/handleEnterKey";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import Image from "next/image";

interface Errors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const inputEmailRef = useRef<any>(null);
  const inputPassRef = useRef<any>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);

  const handleLogin: MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
    e.preventDefault();

    const checkErrors: Errors = {};
    if (!email) {
      checkErrors.email = "Vui lòng nhập email";
    } else if (!validateEmail(email)) {
      checkErrors.email = "Email không hợp lệ";
    }
    if (!password) {
      checkErrors.password = "Vui lòng nhập mật khẩu";
    }
    if (Object.keys(checkErrors).length === 0) {
      // FETCH API
    } else {
      setErrors(checkErrors);

      if (checkErrors.email) {
        inputEmailRef.current?.focus();
      } else if (checkErrors.password) {
        inputPassRef.current?.focus();
      }
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          mb: 5,
        }}
      >
        <Image src="/images/logo.png" alt="Login" width={100} height={100} />
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: 500, my: 3 }}
        >
          Đăng nhập tài khoản
        </Typography>
        <Typography variant="h5" sx={{ fontSize: "1.25rem" }}>
          Chào mừng bạn quay lại Book A Table
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 300,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            rowGap: 3,
          }}
        >
          <TextField
            id="email"
            label="Email"
            variant="standard"
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            autoFocus
            inputRef={inputEmailRef}
            value={email}
            onKeyDown={(e) => handleEnterKey(e, loginButtonRef)}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors({ ...errors, email: "" });
              }
            }}
          />
          <PasswordField
            id="password"
            label="Mật khẩu"
            error={!!errors.password}
            helperText={errors.password}
            value={password}
            inputRef={inputPassRef}
            onKeyDown={(e) => handleEnterKey(e, loginButtonRef)}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors({ ...errors, password: "" });
              }
            }}
          />
          <FormControlLabel control={<Checkbox />} label="Nhớ mật khẩu" />
          <LoadingButton
            startIcon={<SendIcon />}
            loadingPosition="start"
            variant="contained"
            ref={loginButtonRef}
            onClick={handleLogin}
            loading={false}
          >
            Đăng nhập
          </LoadingButton>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            Bạn đã chưa có tài khoản?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{
                textDecoration: "underline",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Đăng ký
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
