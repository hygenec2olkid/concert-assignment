"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { menuAdmin, menuUser } from "@/src/lib/constants/menu";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { set } from "@/src/store/features/userSlice";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const role = useAppSelector((state) => state.user.role);
  const dispatch = useAppDispatch();

  const menu = React.useMemo(() => {
    if (role === "admin") {
      return menuAdmin;
    } else {
      return menuUser;
    }
  }, [role]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const onClickSidebar = (value: string) => {
    if (value === "Switch to user" || value === "Switch to Admin") {
      const role = value === "Switch to user" ? "user" : "admin";
      handleOnChangeRole(role);
    }
  };

  const handleOnChangeRole = (role: string) => {
    dispatch(set(role));
  };

  const DrawerList = (
    <List>
      {menu.map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={text} onClick={() => onClickSidebar(text)} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {role}
        {DrawerList}
      </Drawer>
    </div>
  );
}
