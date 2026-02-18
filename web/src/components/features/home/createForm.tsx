import { useForm } from "react-hook-form";
import CustomCard from "../../ui/Card";
import CustomInput from "../../ui/Input";

type FormData = {
  concertName: string;
  description: string;
  seat: number;
};

export default function CreateForm() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      concertName: "",
      description: "",
      seat: 0,
    },
  });
  return (
    <CustomCard
      isFormCard
      title="Create"
      onClickButton={handleSubmit((data) => console.log(data))}
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
