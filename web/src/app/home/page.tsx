"use client";

import Tab from "@/src/components/ui/Tab";
import CreateForm from "@/src/components/features/home/createForm";
import Overview from "@/src/components/features/home/overview";
import SummaryBox from "@/src/components/features/home/summaryBox";
import TableRowsIcon from "@mui/icons-material/TableRows";
import Sidebar from "@/src/components/layout/Sidebar";
import { useState } from "react";

export default function Home() {
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
      <div className="grid grid-cols-2 gap-3 gap-y-0 tablet:grid-cols-3 tablet:gap-10">
        <SummaryBox value={10} type="total" />
        <SummaryBox value={10} type="reserve" />
        <SummaryBox value={10} type="cancel" />
      </div>
      <Tab
        tabs={[
          { label: "Overview", content: <Overview /> },
          { label: "Create", content: <CreateForm /> },
        ]}
      />
    </>
  );
}
