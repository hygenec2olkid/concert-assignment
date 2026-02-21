"use client";
import Sidebar from "@/src/components/layout/Sidebar";
import Table from "@/src/components/ui/Table";
import { useEffect, useState } from "react";
import TableRowsIcon from "@mui/icons-material/TableRows";
import useApi from "@/src/hooks/useApi";
import { getHistoryApi } from "@/src/lib/api/history/request";
import { HistoryResponse } from "@/src/lib/api/history/type";

const headers = ["Date Time", "Username", "Concert name", "Action"];

// const rows = [
//   { name: "Frozen yoghurt", calories: 159, fat: 6, carbs: 24 },
//   {
//     name: "Ice cream sandwich",
//     calories: 237,
//     fat: 9,
//     carbs: 37,
//   },
// ];

export default function History() {
  const [open, setOpen] = useState(false);
  const { callApi } = useApi<HistoryResponse[]>();
  const [rows, setRows] = useState<
    Record<string, string | boolean | number | null>[]
  >([]);

  useEffect(() => {
    const execute = async () => {
      const res = await callApi(() => getHistoryApi());
      if (res) {
        const formattedRows = res.map((history) => ({
          dateTime: new Date(history.dateTime).toLocaleString(),
          username: history.username,
          concertName: history.concertName,
          action: history.action,
        }));
        setRows(formattedRows);
      }
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
      <Table header={headers} data={rows} />
    </>
  );
}
