"use client";

import { MouseEventHandler, useRef, useState } from "react";
import { validateEmail, validatePhoneNumber } from "../utils/validators";
import { Box, TextField, Typography } from "@mui/material";
import PasswordField from "./PasswordField";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import handleEnterKey from "../utils/handleEnterKey";

interface Errors {
  phone?: string;
  email?: string;
  password?: string;
  confirmedPassword?: string;
}

const RegisterForm = () => {
  // State
  const [errors, setErrors] = useState<Errors>({});
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  // End State

  const registerBtnRef = useRef<HTMLButtonElement | null>(null);
  const inputShopNameRef = useRef<any>(null);
  const inputPhoneRef = useRef<any>(null);
  const inputEmailRef = useRef<any>(null);
  const inputPassRef = useRef<any>(null);
  const inputConfirmedPassRef = useRef<any>(null);
  const inputTUNRef = useRef<any>(null);

  const handleRegister: MouseEventHandler<HTMLButtonElement> | undefined = (
    e
  ) => {
    e.preventDefault();

    const checkErrors: Errors = {};

    if (!validatePhoneNumber(phone)) {
      checkErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!validateEmail(email)) {
      checkErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      checkErrors.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 5) {
      checkErrors.password = "Mật khẩu phải tối thiểu 5 ký tự";
    }

    if (password !== confirmedPassword) {
      checkErrors.confirmedPassword = "Mật khẩu không khớp";
    }

    if (Object.keys(checkErrors).length === 0) {
      // Fetch API
    } else {
      setErrors(checkErrors);

      if (checkErrors.phone) {
        inputPhoneRef.current.focus();
      } else if (checkErrors.email) {
        inputEmailRef.current.focus();
      } else if (checkErrors.password) {
        inputPassRef.current.focus();
      } else if (checkErrors.confirmedPassword) {
        inputConfirmedPassRef.current.focus();
      }
    }
  };
  return (
    <Box display="flex" flexDirection="column" width="30rem" rowGap={2}>
      <Typography
        variant="h4"
        color="primary"
        textAlign="center"
        sx={{ fontWeight: 500, mb: 3 }}
      >
        Đăng ký thành viên
      </Typography>

      {/* Phone input */}
      <TextField
        id="phone"
        label="Số điện thoại"
        variant="standard"
        error={!!errors.phone}
        helperText={errors.phone}
        inputRef={inputPhoneRef}
        fullWidth
        onKeyDown={(e) => handleEnterKey(e, registerBtnRef)}
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          if (errors.phone) {
            setErrors({ ...errors, phone: "" });
          }
        }}
      />
      {/* End Phone input */}

      {/* Email input */}
      <TextField
        id="email"
        label="Email"
        variant="standard"
        inputRef={inputEmailRef}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        onKeyDown={(e) => handleEnterKey(e, registerBtnRef)}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (errors.email) {
            setErrors({ ...errors, email: "" });
          }
        }}
      />
      {/* End Email input */}

      {/* Pass input */}
      <PasswordField
        id="password"
        label="Mật khẩu"
        error={!!errors.password}
        helperText={errors.password}
        inputRef={inputPassRef}
        value={password}
        onKeyDown={(e) => handleEnterKey(e, registerBtnRef)}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errors.password) {
            setErrors({ ...errors, password: "" });
          }
        }}
      />
      {/* End Pass input */}

      {/* Confirmed Pass input */}
      <PasswordField
        id="confirmed-password"
        label="Nhập lại mật khẩu"
        error={!!errors.confirmedPassword}
        helperText={errors.confirmedPassword}
        value={confirmedPassword}
        inputRef={inputConfirmedPassRef}
        onKeyDown={(e) => handleEnterKey(e, registerBtnRef)}
        onChange={(e) => {
          setConfirmedPassword(e.target.value);
          if (errors.confirmedPassword) {
            setErrors({
              ...errors,
              confirmedPassword: "",
            });
          }
        }}
      />
      {/* End Confirmed Pass input */}
      <LoadingButton
        sx={{ mt: 2 }}
        startIcon={<SendIcon />}
        loadingPosition="start"
        variant="contained"
        ref={registerBtnRef}
        onClick={handleRegister}
        loading={false}
      >
        Đăng ký
      </LoadingButton>
    </Box>
  );
};

export default RegisterForm;
