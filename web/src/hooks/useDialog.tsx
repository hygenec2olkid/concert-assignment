import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomButton, { ButtonType } from "../components/ui/Button";

type DialogType = "delete";

type DialogProps = {
  type: DialogType;
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
};

export function useDialog({ type, onConfirm }: DialogProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [value, setValue] = useState<number>(0);

  const openDialog = (value: number, message: string) => {
    setOpen(true);
    setValue(value);
    setContent(message);
  };
  const closeDialog = () => setOpen(false);

  const config = dialogConfig[type];

  const handleOnClick = (type: ButtonType) => {
    if (type === "confirmDelete") {
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
  };
}
