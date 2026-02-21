"use client";

import Tab from "@/src/components/ui/Tab";
import CreateForm from "@/src/components/features/home/createForm";
import Overview from "@/src/components/features/home/overview";
import SummaryBox from "@/src/components/features/home/summaryBox";
import TableRowsIcon from "@mui/icons-material/TableRows";
import Sidebar from "@/src/components/layout/Sidebar";
import { useEffect, useState } from "react";
import { SummaryResponse } from "@/src/lib/api/concert/type";
import useApi from "@/src/hooks/useApi";
import { getSummaryApi } from "@/src/lib/api/concert/request";

export default function Home() {
  const [open, setOpen] = useState(false);
  const { callApi, data } = useApi<SummaryResponse>();

  useEffect(() => {
    const execute = async () => {
      await callApi(() => getSummaryApi());
    };

    execute();
  }, [callApi]);

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
        <SummaryBox value={data?.totalSeat} type="total" />
        <SummaryBox value={data?.reserve} type="reserve" />
        <SummaryBox value={data?.cancel} type="cancel" />
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
