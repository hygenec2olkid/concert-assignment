import Table from "@/src/components/ui/Table";

const headers = ["Name", "Calories", "Fat", "Carbs", "Protein"];

const rows = [
  { name: "Frozen yoghurt", calories: 159, fat: 6, carbs: 24, protein: 4 },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3,
  },
];

export default function History() {
  return <Table header={headers} data={rows} />;
}
