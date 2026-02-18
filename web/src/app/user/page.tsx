"use client";

import Sidebar from "@/src/components/layout/Sidebar";
import { useState } from "react";
import TableRowsIcon from "@mui/icons-material/TableRows";

export default function User() {
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
      User page
    </>
  );
}
