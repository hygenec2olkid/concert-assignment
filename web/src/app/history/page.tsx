"use client";
import Sidebar from "@/src/components/layout/Sidebar";
import Table from "@/src/components/ui/Table";
import { useEffect, useState } from "react";
import TableRowsIcon from "@mui/icons-material/TableRows";
import useApi from "@/src/hooks/useApi";
import { getHistoryApi } from "@/src/lib/api/history/request";
import { HistoryResponse } from "@/src/lib/api/history/type";
import { useAppSelector } from "@/src/store/hooks";

const headers = ["Date Time", "Username", "Concert name", "Action"];

export default function History() {
  const [open, setOpen] = useState(false);
  const { callApi } = useApi<HistoryResponse[]>();
  const { userId, role } = useAppSelector((state) => state.user);

  const [rows, setRows] = useState<
    Record<string, string | boolean | number | null>[]
  >([]);

  const getUserId = () => {
    if (role === "Admin") {
      return undefined;
    } else {
      return userId;
    }
  };

  useEffect(() => {
    const execute = async () => {
      const userIdToFetch = getUserId();
      const res = await callApi(() => getHistoryApi(userIdToFetch));

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
