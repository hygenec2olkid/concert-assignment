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
import { useAppSelector } from "@/src/store/hooks";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';



export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const role = useAppSelector((state) => state.user.role);

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

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menu.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
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
