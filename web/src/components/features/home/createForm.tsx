import { useForm } from "react-hook-form";
import CustomCard from "../../ui/Card";
import CustomInput from "../../ui/Input";
import useApi from "@/src/hooks/useApi";
import { createNewConcertApi } from "@/src/lib/api/concert/request";
import { Concert, CreateConcertRequest } from "@/src/lib/api/concert/type";

type FormData = {
  concertName: string;
  description: string;
  seat: number;
};

export default function CreateForm() {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      concertName: "",
      description: "",
      seat: 0,
    },
  });

  const { callApi, loading } = useApi<Concert>();

  const createNewConcert = async (data: FormData) => {
    const req: CreateConcertRequest = {
      concertName: data.concertName,
      description: data.description,
      totalSeat: data.seat,
    };
    
    const res = await callApi(() => createNewConcertApi(req));

    if (res) {
      reset();
    }
  };

  return (
    <CustomCard
      isFormCard
      title="Create"
      loading={loading}
      onClickButton={handleSubmit((data) => createNewConcert(data))}
    >
      <form>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
          <CustomInput
            control={control}
            config={{
              name: "concertName",
              label: "Concert Name",
              rules: { required: "Concert Name is required" },
              placeholder: "Please input concert name",
            }}
          />

          <CustomInput
            control={control}
            config={{
              name: "seat",
              label: "Total of seat",
              rules: { required: "Seat is required" },
              placeholder: "Please input total of seat",
              showIcon: true,
              type: "number",
            }}
          />

          <div className="tablet:col-span-2 ">
            <CustomInput
              control={control}
              config={{
                label: "Description",
                name: "description",
                multiline: true,
                rows: 4,
                placeholder: "Please input description",
              }}
            />
          </div>
        </div>
      </form>
    </CustomCard>
  );
}
