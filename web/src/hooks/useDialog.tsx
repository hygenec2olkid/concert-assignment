import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomButton, {
  ButtonType,
  CONFIRM_TYPES,
} from "../components/ui/Button";

export type DialogType = "delete" | "reserve" | "cancel";

type DialogProps = {
  onConfirm?: () => void;
};

type DialogConfig = {
  title: string;
  icon?: React.ReactNode;
  buttonListType: ButtonType[];
};

const dialogConfig: Record<DialogType, DialogConfig> = {
  delete: {
    title: "Are you sure to delete?",
    icon: <CancelIcon color="error" sx={{ fontSize: 50 }} />,
    buttonListType: ["cancelDialog", "confirmDelete"],
  },
  reserve: {
    title: "Are you sure to reserve?",
    buttonListType: ["cancelDialog", "confirmReserve"],
  },
  cancel: {
    title: "Are you sure to cancel?",
    icon: <CancelIcon color="error" sx={{ fontSize: 50 }} />,
    buttonListType: ["cancelDialog", "confirmCancel"],
  },
};

export function useDialog({ onConfirm }: DialogProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [value, setValue] = useState<number>(0);
  const [type, setType] = useState<DialogType>("delete");

  const openDialog = (value: number, message: string, type: DialogType) => {
    setOpen(true);
    setValue(value);
    setContent(message);
    setType(type);
  };
  const closeDialog = () => setOpen(false);

  const config = dialogConfig[type];

  const handleOnClick = (type: ButtonType) => {
    if (CONFIRM_TYPES.includes(type)) {
      onConfirm?.();
    }
    closeDialog();
  };

  const DialogComponent = () => (
    <Dialog open={open} onClose={closeDialog}>
      <Box sx={{ textAlign: "center", p: 3 }}>
        {config.icon}

        <DialogTitle>{config.title}</DialogTitle>

        <DialogContent>{`"${content}"`}</DialogContent>

        <DialogActions sx={{ justifyContent: "center", gap: 1 }}>
          {config.buttonListType.map((buttonType, index) => (
            <CustomButton
              key={index}
              type={buttonType}
              onClick={() => handleOnClick(buttonType)}
            />
          ))}
        </DialogActions>
      </Box>
    </Dialog>
  );

  return {
    openDialog,
    closeDialog,
    DialogComponent,
    onConfirm,
    value,
    type
  };
}
