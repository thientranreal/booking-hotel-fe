import {
  List,
  ListItemText,
  Divider,
  ListItem,
  ListItemButton,
  Button,
  Stack,
} from "@mui/material";

const pages = ["HOME", "RESTAURANTS", "RESERVATIONS", "CONTACT"];

export default function SideNav() {
  return (
    <List>
      <Divider sx={{ mt: "5rem" }} />
      {pages.map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}

      <Stack spacing={2} p={2}>
        <Button variant="outlined">Login</Button>
        <Button variant="contained">Register</Button>
      </Stack>
    </List>
  );
}
