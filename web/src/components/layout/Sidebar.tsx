"use client";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { menuAdmin, menuUser } from "@/src/lib/constants/menu";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setRole } from "@/src/store/features/userSlice";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import LoopIcon from "@mui/icons-material/Loop";
import LogoutIcon from "@mui/icons-material/Logout";
import { usePathname, useRouter } from "next/navigation";
import Drawer from "@mui/material/Drawer";
import { useMemo } from "react";

export default function Sidebar({
  isDrawer,
  open,
  onClose,
}: {
  isDrawer?: boolean;
  open?: boolean;
  onClose?: () => void;
}) {
  const router = useRouter();
  const { role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const menu = useMemo(() => {
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
      const newRole = value === "Switch to user" ? "User" : "Admin";
      dispatch(setRole(newRole));
    }

    if (value === "Home" || value === "Switch to Admin") {
      router.push("/home");
    }

    if (value === "History") {
      router.push("/history");
    }

    if (value === "Switch to user") {
      router.push("/user");
    }
  };

  const onClickLogout = () => {
    dispatch(setRole(""));
    localStorage.removeItem("role");
    router.push("/");
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

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r-1 border-gray-300">
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
    </div>
  );

  return (
    <aside
      className={`w-[20%] hidden tablet:block ${
        pathname === "/" ? "tablet:hidden" : ""
      }
    `}
    >
      {isDrawer ? (
        <Drawer
          anchor="left"
          open={open ?? false}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {sidebarContent}
        </Drawer>
      ) : (
        sidebarContent
      )}
    </aside>
  );
}
