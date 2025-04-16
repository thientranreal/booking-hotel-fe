"use client";

import { Button, TextField, Grid, Typography, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { currentUser, userLogin } from "@/app/api/user";
import { toast } from "react-toastify";

export default function Login() {
  const queryParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const data = await currentUser();

      if (data && data.user) {
        router.push(queryParams.get("redirect") || "/");
      }
    };

    checkLogin();
  }, []);

  useEffect(() => {
    if (isLoading) {
      const login = async () => {
        // Login from payload
        const data = await userLogin(email, password);

        if (data.errors) {
          const errorMsg = data.errors[0].message;

          if (errorMsg === "The email or password provided is incorrect.") {
            toast.error("Email hoặc mật khẩu không đúng");
          } else if (
            errorMsg ===
            "This user is locked due to having too many failed login attempts."
          ) {
            toast.error(
              "Tài khoản của bạn bị khóa vì đăng nhập thất bại nhiều lần"
            );
          } else {
            toast.error("Đăng nhập thất bại " + errorMsg);
          }
        } else {
          console.log("Đăng nhập thành công ", data);
          toast.success("Đăng nhập thành công");
          router.push(queryParams.get("redirect") || "/");
        }

        setIsLoading(false);
      };

      login();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("All fields are required!");
    } else {
      setError("");
      setIsLoading(true);
    }
  };

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
        Đăng nhập
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Đăng nhập
        </LoadingButton>
      </form>
      <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
        <Grid item>
          <Button
            onClick={() => {
              const redirect = queryParams.get("redirect");

              router.push(
                redirect
                  ? `/signup?redirect=${encodeURIComponent(redirect)}`
                  : "/signup"
              );
            }}
          >
            Chưa có tài khoản? Đăng ký
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
