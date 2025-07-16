import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { SunMoon, User } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between min-w-full gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ms-1" />
        <Separator orientation="vertical" className="me-2 h-4" />
      </div>

      <div className="flex items-center gap-2 px-4 w-full justify-end">
        <Button variant="secondary" size="icon" className="group/toggle">
          <SunMoon />
        </Button>
        <Button variant="secondary" size="icon" className="group/toggle">
          <User />
        </Button>
      </div>
    </header>
  );
}
