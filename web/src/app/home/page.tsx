"use client";

import Button from "@/src/components/ui/Button";
import Tab from "@/src/components/ui/Tab";
import Card from "@/src/components/ui/Card";
import { useDialog } from "@/src/hooks/useDialog";
import Table from "@/src/components/ui/Table";

const headers = ["Name", "Calories", "Fat", "Carbs", "Protein"];

const rows = [
  { name: "Frozen yoghurt", calories: 159, fat: 6, carbs: 24, protein: 4 },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3,
  },
];

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
      <Card title="test" isFormCard>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
          laudantium natus inventore consequatur, a modi dolor deleniti.
          Possimus tempore sed quasi, commodi a aliquid corrupti aspernatur
          nobis. Maxime, eius sed.
        </div>
      </Card>
      <DialogComponent />
      <Table header={headers} data={rows} />
    </div>
  );
}
