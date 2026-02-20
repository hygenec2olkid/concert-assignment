import { useToast } from "@/src/hooks/useToast";
import CustomCard from "../../ui/Card";
import { useDialog } from "@/src/hooks/useDialog";
import useApi from "@/src/hooks/useApi";
import { useEffect } from "react";
import { deleteConcertApi, getConcertApi } from "@/src/lib/api/concert/request";
import { ConcertResponse } from "@/src/lib/api/concert/type";
import { useLoading } from "@/src/hooks/useLoading";

export default function Overview() {
  const { ToastComponent, onOpen } = useToast({
    type: "success",
  });

  const { openDialog, DialogComponent, value } = useDialog({
    type: "delete",
    onConfirm: () => onDeleteConcert(value),
  });

  const { onLoading, LoadingComponent, offLoading } = useLoading();

  const { data: concerts, callApi } = useApi<ConcertResponse[]>();

  const { callApi: deleteConcert } = useApi<{
    message: string;
  }>();

  const getConcerts = async () => {
    try {
      onLoading();
      await callApi(() => getConcertApi());
    } finally {
      offLoading();
    }
  };

  const onDeleteConcert = async (id: number) => {
    const res = await deleteConcert(() => deleteConcertApi(id));

    if (res) {
      onOpen(res.message);
      getConcerts();
    }
  };

  const execute = async () => {
    try {
      onLoading();
      Promise.all([await callApi(() => getConcertApi())]);
    } finally {
      offLoading();
    }
  };

  useEffect(() => {
    execute();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {concerts?.map((concert) => (
        <CustomCard
          key={concert.concertName}
          title={concert.concertName}
          isConcertCard
          cardContent={concert}
          onClickButton={() => {
            openDialog(concert.id, concert.concertName);
          }}
        >
          <div>{concert.description}</div>
        </CustomCard>
      ))}

      <DialogComponent />
      <ToastComponent />
      <LoadingComponent />
    </div>
  );
}
