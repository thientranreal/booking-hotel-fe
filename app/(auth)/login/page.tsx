import LoginForm from "@/components/LoginForm";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Login() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          flex: { md: 1 },
          bgcolor: "black",
          position: "relative",
        }}
      >
        <Image
          src="/images/login-table-reserve.jpg"
          alt="login-picture"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoginForm />
      </Box>
    </Box>
  );
}
