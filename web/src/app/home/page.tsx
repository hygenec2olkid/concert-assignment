"use client";

import Button from "@/src/components/ui/Button";
import Tab from "@/src/components/ui/Tab";
import Card from "@/src/components/ui/Card";
import { useDialog } from "@/src/hooks/useDialog";

export default function Home() {
  const { openDialog, DialogComponent } = useDialog({
    type: "delete",
    content: "”Concert Name 2”",
    onConfirm: () => console.log("Confirmed!"),
  });

  return (
    <div>
      <Button type="delete" onClick={() => console.log("Delete clicked")} />
      <Button type="save" />
      <Button type="cancel" />
      <Button type="reserve" />
      <Tab
        tabs={[
          { label: "Overview", content: <div>overview</div> },
          { label: "Create", content: <div>create</div> },
        ]}
      />
      <Card title="test" isConcertCard onClickButton={openDialog}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
          laudantium natus inventore consequatur, a modi dolor deleniti.
          Possimus tempore sed quasi, commodi a aliquid corrupti aspernatur
          nobis. Maxime, eius sed.
        </div>
      </Card>
      <Card title="test">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
          laudantium natus inventore consequatur, a modi dolor deleniti.
          Possimus tempore sed quasi, commodi a aliquid corrupti aspernatur
          nobis. Maxime, eius sed.
        </div>
      </Card>
      <DialogComponent />
    </div>
  );
}
