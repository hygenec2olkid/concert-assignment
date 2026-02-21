"use client";

import Sidebar from "@/src/components/layout/Sidebar";
import { useEffect, useState } from "react";
import TableRowsIcon from "@mui/icons-material/TableRows";
import useApi from "@/src/hooks/useApi";
import {
  cancelApi,
  reserveApi,
  userGetConcertApi,
} from "@/src/lib/api/concert/request";
import { useAppSelector } from "@/src/store/hooks";
import { ConcertResponse } from "@/src/lib/api/concert/type";
import CustomCard from "@/src/components/ui/Card";
import { useDialog } from "@/src/hooks/useDialog";
import { ButtonType } from "@/src/components/ui/Button";
import { useToast } from "@/src/hooks/useToast";
import { ApiResponse } from "@/src/types/api";

export default function User() {
  const [open, setOpen] = useState(false);
  const userId = useAppSelector((state) => state.user.userId);
  const { callApi, data } = useApi<ConcertResponse[]>();
  const { callApi: reserveConcert } = useApi<ApiResponse>();
  const { callApi: cancelTicket } = useApi<ApiResponse>();
  const { openDialog, DialogComponent, value, type } = useDialog({
    onConfirm: () => handleConcertAction(value, type),
  });
  const { ToastComponent, onOpen } = useToast();

  const handleConcertAction = async (concertId: number, actionType: string) => {
    if (!userId) return;

    const req = {
      userId: userId,
      concertId,
    };

    if (actionType === "reserve" && userId) {
      const res = await reserveConcert(() => reserveApi(req));

      if (res) onOpen(res.message);

      await callApi(() => userGetConcertApi(userId!));
    } else if (actionType === "cancel" && userId) {
      const res = await cancelTicket(() => cancelApi(req));

      if (res) onOpen(res.message);

      await callApi(() => userGetConcertApi(userId!));
    }
  };

  const onClickActionButton = (concert: ConcertResponse) => {
    const { id, concertName, reservedSeat } = concert;

    if (reservedSeat) {
      openDialog(id, concertName, "cancel");
    } else {
      openDialog(id, concertName, "reserve");
    }
  };

  const buttonType = (concert: ConcertResponse): ButtonType =>
    concert.reservedSeat ? "cancel" : "reserve";

  useEffect(() => {
    if (!userId) return;
    callApi(() => userGetConcertApi(userId));
  }, [callApi, userId]);

  return (
    <>
      <Sidebar isDrawer open={open} onClose={() => setOpen(false)} />

      <div
        className="tablet:hidden cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <TableRowsIcon sx={{ marginBottom: 2, opacity: 0.5 }} />
      </div>

      <div className="flex flex-col gap-5">
        {data?.map((concert) => (
          <CustomCard
            key={concert.concertName}
            title={concert.concertName}
            isConcertCard
            cardContent={concert}
            type={buttonType(concert)}
            onClickButton={() => onClickActionButton(concert)}
          >
            <div>{concert.description}</div>
          </CustomCard>
        ))}
      </div>
      <DialogComponent />
      <ToastComponent />
    </>
  );
}
