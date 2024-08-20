import {
  Container,
  Paper,
  Typography,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import AccountMod from "@/components/AccountMod";

export default async function Account() {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/");
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600}>
          Thông tin tài khoản
        </Typography>

        <Divider sx={{ my: 3, bgcolor: "#938F8E" }} />

        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Avatar src={user.picture} sx={{ width: 80, height: 80 }} />
          <Typography variant="h6">{user.name}</Typography>
        </Box>

        <AccountMod />
      </Paper>
    </Container>
  );
}
