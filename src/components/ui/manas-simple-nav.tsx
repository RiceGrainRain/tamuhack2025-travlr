"use client";
import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../../../tamuhack2025-travlr/src/lib/routes.ts";

export function Navbar() {
  return (
    <nav className="w-full py-4 bg-black shadow-md">
      <div className="flex justify-between items-center px-4">
        {/* Left Side: Title */}
        <span className="text-lg font-semibold text-black">Flight Attendant</span>

        {/* Right Side: Navigation Links */}
        <div className="flex space-x-4">
          <Link
            to={routes.hero}
            className="text-sm font-medium text-gray-700 hover:text-blue-500"
          >
            Hero
          </Link>
          <Link
            to={routes.flightAttendantManager}
            className="text-sm font-medium text-gray-700 hover:text-blue-500"
          >
            Flight Attendant Manager
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
