"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const pages = ["HOME", "RESTAURANTS", "RESERVATIONS", "CONTACT"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar() {
  const { user } = useUser();

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenSidebar(newOpen);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>

            {/* Sidebar */}
            <Drawer
              anchor="left"
              open={openSidebar}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: "15rem" }}
                role="presentation"
                onClick={toggleDrawer(false)}
              >
                <SideNav isLogin={!!user} />
              </Box>
            </Drawer>
            {/* End Sidebar */}
          </Box>

          <Box
            flex={{ xs: 1, md: "inherit" }}
            display="flex"
            justifyContent="center"
          >
            <Image src="/images/logo.png" alt="Logo" width={200} height={200} />
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((text) => (
              <Button
                key={text}
                sx={{ my: 2, color: "black", display: "block" }}
                component={Link}
                href={text === "HOME" ? "/" : `/${text.toLowerCase()}`}
              >
                {text}
              </Button>
            ))}
          </Box>

          {user ? (
            <Box>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={user.picture || ""} alt={user.name || "NA"} />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={handleCloseUserMenu}
                    component={Link}
                    href={
                      setting === "Logout"
                        ? "/api/auth/logout"
                        : `/${setting.toLowerCase()}`
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box display={{ xs: "none", md: "flex" }} py={1} gap={2}>
              <Button
                variant="outlined"
                component={Link}
                href="/api/auth/login"
              >
                Đăng nhập
              </Button>
              <Button
                variant="contained"
                component={Link}
                href="/api/auth/signup"
              >
                Đăng ký
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function SideNav({ isLogin }: { isLogin: boolean }) {
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

      {!isLogin && (
        <Box display="flex" flexDirection="column" gap={2} p={2}>
          <Button variant="outlined" component={Link} href="/api/auth/login">
            Đăng nhập
          </Button>
          <Button variant="contained" component={Link} href="/api/auth/signup">
            Đăng ký
          </Button>
        </Box>
      )}
    </List>
  );
}
