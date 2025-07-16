import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollArea className={`w-full h-[calc(100dvh-64px)]`}>
        <div className="flex flex-1 p-4 md:px-6 w-full">{children}</div>
      </ScrollArea>
    </>
  );
}
