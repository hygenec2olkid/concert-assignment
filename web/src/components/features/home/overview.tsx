import React from "react";
import CustomCard from "../../ui/Card";
import { useDialog } from "@/src/hooks/useDialog";

export default function Overview() {
  const { openDialog, DialogComponent } = useDialog({
    type: "delete",
    content: "”Concert Name 2”",
    onConfirm: () => console.log("Confirmed!"),
  });
  return (
    <CustomCard title="Concert Name 1" isConcertCard onClickButton={openDialog}>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam laudantium
        natus inventore consequatur, a modi dolor deleniti. Possimus tempore sed
        quasi, commodi a aliquid corrupti aspernatur nobis. Maxime, eius sed.
      </div>
      <DialogComponent />
    </CustomCard>
  );
}
