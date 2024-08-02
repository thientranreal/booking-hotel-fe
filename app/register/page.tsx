import RegisterForm from "@/components/RegisterForm";
import { Box } from "@mui/material";

export default function Register() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <RegisterForm />
    </Box>
  );
}
