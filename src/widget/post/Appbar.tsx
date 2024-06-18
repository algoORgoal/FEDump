"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSearchStore } from "../../features/search";
import { SearchBar } from "../../features/search/ui/SearchBar";
import { useState } from "react";
import Link from "next/link";

export default function SearchHeader() {
  const { query, updateQuery } = useSearchStore((state) => ({
    query: state.query,
    updateQuery: state.updateQuery,
  }));

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <>
          <ListItem key={"로그인"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={"미션 파이팅입니다!"} />
            </ListItemButton>
          </ListItem>
        </>
        <>
          <ListItem key={"로그아웃"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"할 수 있다~"} />
            </ListItemButton>
          </ListItem>
        </>

        {/* 9주차 미션에서는 로그인 구현x */}
        {/* {isLoggedIn ? (
          ['로그아웃', '마이페이지'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <LogoutIcon /> : <PermIdentityIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <>
            <ListItem key={'로그인'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={'로그인'} />
              </ListItemButton>
            </ListItem>
          </>
        )} */}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: "auto" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", color: "black" }}
        className=" text-black dark:bg-zinc-700 dark:text-white"
        elevation={0}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Link
            href="/"
            className="grow invisible sm:visible overflow-ellipsis"
          >
            byeol_chance
          </Link>
          <SearchBar query={query} onSearch={updateQuery} />
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
