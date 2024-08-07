import {
  List,
  ListItemText,
  Divider,
  ListItem,
  ListItemButton,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";

const pages = ["HOME", "RESTAURANTS", "RESERVATIONS", "CONTACT"];

export default function SideNav() {
  return (
    <List>
      <Divider sx={{ mt: "5rem" }} />
      {pages.map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton
            component={Link}
            href={text === "HOME" ? "/" : `/${text.toLowerCase()}`}
          >
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}

      <Box display="flex" flexDirection="column" gap={2} p={2}>
        <Button variant="outlined" component={Link} href="/login">
          Đăng nhập
        </Button>
        <Button variant="contained" component={Link} href="/register">
          Đăng ký
        </Button>
      </Box>
    </List>
  );
}
