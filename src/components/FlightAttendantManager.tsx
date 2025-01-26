import React from "react";
import { SidebarDemo } from "./ui/Sidebardemo";

export function AttendantManager(){
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white">
        <SidebarDemo />
      </div>
    </div>
  );
};

export default AttendantManager;
