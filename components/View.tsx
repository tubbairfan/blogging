"use client";

import setting2 from "@/public/Settings2.svg";
import { Button } from "@/components/ui/button"; 

export default function View() {
  return (
    <div >
      <Button size="sm" variant="outline">
        <img src={setting2.src} alt="Settings"/>
        View
      </Button>
    </div>
  );
}
