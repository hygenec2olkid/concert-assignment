import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { ReactNode } from "react";
import { SxProps, Theme } from "@mui/material/styles";

export type ButtonType =
  | "delete"
  | "save"
  | "cancel"
  | "reserve"
  | "cancelDialog"
  | "confirmDelete";

type ButtonsProps = {
  type: ButtonType;
  onClick?: () => void;
};

type ButtonConfig = {
  label: string;
  color?: "primary" | "error" | "secondary" | "success";
  icon?: ReactNode;
  sx?: SxProps<Theme>;
};

const buttonConfig: Record<ButtonType, ButtonConfig> = {
  delete: {
    label: "Delete",
    color: "error",
    icon: <DeleteIcon />,
  },
  save: {
    label: "Save",
    icon: <SaveIcon />,
  },
  cancel: {
    label: "Cancel",
    color: "error",
  },
  reserve: {
    label: "Reserve",
  },
  cancelDialog: {
    label: "Cancel",
    sx: {
      backgroundColor: "#FFFF",
      color: "#262626",
      border: "1px solid #C2C2C2",
    },
  },
  confirmDelete: {
    label: "Yes, Delete",
    color: "error",
  },
};

export default function CustomButton({ type, onClick }: ButtonsProps) {
  const config = buttonConfig[type];

  return (
    <Button
      variant="contained"
      color={config.color}
      startIcon={config.icon}
      onClick={onClick}
      sx={{
        textTransform: "none",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
        ...config.sx,
      }}
    >
      {config.label}
    </Button>
  );
}
