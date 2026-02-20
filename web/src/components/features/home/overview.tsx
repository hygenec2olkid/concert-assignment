import { useToast } from "@/src/hooks/useToast";
import CustomCard from "../../ui/Card";
import { useDialog } from "@/src/hooks/useDialog";
import useApi from "@/src/hooks/useApi";
import { useEffect } from "react";
import { getConcertApi } from "@/src/lib/api/concert/request";
import { ConcertResponse } from "@/src/lib/api/concert/type";

export default function Overview() {
  const { ToastComponent, handleClick } = useToast({
    type: "success",
    message: "Concert deleted successfully",
  });

  const { openDialog, DialogComponent } = useDialog({
    type: "delete",
    onConfirm: () => handleClick(),
  });

  const { data: concerts, callApi } = useApi<ConcertResponse[]>();

  useEffect(() => {
    callApi(() => getConcertApi());
  }, [callApi]);

  return (
    <div className="flex flex-col gap-5">
      {concerts?.map((concert) => (
        <CustomCard
          key={concert.concertName}
          title={concert.concertName}
          isConcertCard
          onClickButton={() => {
            openDialog(concert.concertName);
          }}
        >
          <div>{concert.description}</div>
        </CustomCard>
      ))}

      {/* ✅ Only ONE dialog */}
      <DialogComponent />
      <ToastComponent />
    </div>
  );
}
