import { useToast } from "@/src/hooks/useToast";
import CustomCard from "../../ui/Card";
import { useDialog } from "@/src/hooks/useDialog";
import useApi from "@/src/hooks/useApi";
import { useEffect } from "react";
import { deleteConcertApi, getConcertApi } from "@/src/lib/api/concert/request";
import { ConcertResponse } from "@/src/lib/api/concert/type";

export default function Overview() {
  const { ToastComponent, onOpen } = useToast({
    type: "success",
  });

  const { openDialog, DialogComponent, value } = useDialog({
    onConfirm: () => onDeleteConcert(value),
  });

  const { data: concerts, callApi } = useApi<ConcertResponse[]>();

  const { callApi: deleteConcert } = useApi<{
    message: string;
  }>();

  const onDeleteConcert = async (id: number) => {
    const res = await deleteConcert(() => deleteConcertApi(id));

    if (res) {
      onOpen(res.message);
      callApi(() => getConcertApi());
    }
  };

  const execute = () => {
    Promise.all([callApi(() => getConcertApi())]);
  };

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {concerts?.map((concert) => (
        <CustomCard
          key={concert.concertName}
          title={concert.concertName}
          isConcertCard
          cardContent={concert}
          type="delete"
          onClickButton={() => {
            openDialog(concert.id, concert.concertName, "delete");
          }}
        >
          <div>{concert.description}</div>
        </CustomCard>
      ))}

      <DialogComponent />
      <ToastComponent />
    </div>
  );
}
