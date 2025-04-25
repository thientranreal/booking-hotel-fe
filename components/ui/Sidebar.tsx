"use client";

import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import { Menu, Home, Info, Settings, Close } from "@mui/icons-material";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(true);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const menuItems = [
    { text: "Home", icon: <Home />, href: "/" },
    { text: "About", icon: <Info />, href: "/about" },
    { text: "Settings", icon: <Settings />, href: "/settings" },
  ];

  return (
    <Box>
      {!open && (
        <Box display="flex" height="100vh" alignItems="flex-start">
          <IconButton onClick={toggleDrawer(true)}>
            <Menu />
          </IconButton>

          <Divider orientation="vertical" />
        </Box>
      )}
      <Drawer
        anchor="left"
        open={open}
        variant="persistent"
        sx={{
          width: open ? 250 : 50,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 250 },
        }}
      >
        <IconButton sx={{ marginLeft: "auto" }} onClick={toggleDrawer(false)}>
          <Close />
        </IconButton>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} href={item.href}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
