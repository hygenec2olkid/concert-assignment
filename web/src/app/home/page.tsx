"use client";

import Tab from "@/src/components/ui/Tab";
import CreateForm from "@/src/components/features/home/createForm";
import Overview from "@/src/components/features/home/overview";

export default function Home() {
  return (
    <Tab
      tabs={[
        { label: "Overview", content: <Overview /> },
        { label: "Create", content: <CreateForm /> },
      ]}
    />
  );
}
