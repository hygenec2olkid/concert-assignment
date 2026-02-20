import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

type ToastType = "success";

type ToastProps = {
  type: ToastType;
};

type ToastConfig = {
  icon?: React.ReactNode;
  color?: "primary" | "error" | "secondary" | "success";
  backgroundColor: string;
};

const ToastConfig: Record<ToastType, ToastConfig> = {
  success: {
    icon: <CheckCircleOutlineIcon color="success" sx={{ fontSize: 25 }} />,
    backgroundColor: "#D0E7D2",
  },
};

export function useToast({ type }: ToastProps) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");
  const config = ToastConfig[type];

  const onOpen = (content: string) => {
    setContent(content);
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        sx={{ color: "black" }}
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const ToastComponent = () => (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={5000}
        onClose={handleClose}
        action={action}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: config.backgroundColor,
            boxShadow: "none",
          },
        }}
        message={
          <span className="flex items-center gap-2 text-black">
            {config.icon}
            {content}
          </span>
        }
      />
    </div>
  );

  return { ToastComponent, onOpen };
}
