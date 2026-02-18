"use client";

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { menuAdmin, menuUser } from "@/src/lib/constants/menu";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { set } from "@/src/store/features/userSlice";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import LoopIcon from "@mui/icons-material/Loop";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const role = useAppSelector((state) => state.user.role);
  const dispatch = useAppDispatch();

  const menu = React.useMemo(() => {
    if (role === "Admin") {
      return menuAdmin;
    }

    if (role === "User") {
      return menuUser;
    }

    return [];
  }, [role]);

  const onClickSidebar = (value: string) => {
    if (value === "Switch to user" || value === "Switch to Admin") {
      handleSwitchRole(value);
    }

    if (value === "Home") {
      router.push("/home");
    }

    if (value === "History") {
      router.push("/history");
    }
  };

  const onClickLogout = () => {
    dispatch(set(""));
    router.push("/");
  };

  const handleSwitchRole = (value: string) => {
    const newRole = value === "Switch to user" ? "User" : "Admin";
    dispatch(set(newRole));

    if (newRole === "Admin") {
      router.push("/home");
    }

    if (newRole === "User") {
      router.push("/user");
    }
  };

  const getIcon = (text: string) => {
    switch (text) {
      case "Home":
        return <HomeIcon />;
      case "History":
        return <HistoryIcon />;
      case "Switch to user":
      case "Switch to Admin":
        return <LoopIcon />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <>
        <p className="text-center text-3xl font-semibold py-4">{role}</p>

        <List>
          {menu.map((text) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ padding: 1 }}
              onClick={() => onClickSidebar(text)}
            >
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#EAF5F9",
                  },
                }}
              >
                <ListItemIcon>{getIcon(text)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>

      {role && (
        <div className="mt-auto pb-10" onClick={onClickLogout}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </div>
      )}
    </div>
  );
}
