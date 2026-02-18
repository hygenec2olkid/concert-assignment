"use client";

import Tab from "@/src/components/ui/Tab";
import CreateForm from "@/src/components/features/home/createForm";
import Overview from "@/src/components/features/home/overview";
import SummaryBox from "@/src/components/features/home/summaryBox";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 gap-y-0 tablet:grid-cols-3 tablet:gap-10">
        <SummaryBox value={10} type="total" />
        <SummaryBox value={10} type="reserve" />
        <SummaryBox value={10} type="cancel" />
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
