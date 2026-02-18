"use client";
import Sidebar from "@/src/components/layout/Sidebar";
import Table from "@/src/components/ui/Table";
import { useState } from "react";
import TableRowsIcon from "@mui/icons-material/TableRows";

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

export default function History() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sidebar isDrawer open={open} onClose={() => setOpen(false)} />
      <div
        className="tablet:hidden cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <TableRowsIcon sx={{ marginBottom: 2, opacity: 0.5 }} />
      </div>
      <Table header={headers} data={rows} />
    </>
  );
}
