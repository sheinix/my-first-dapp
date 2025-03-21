import React from "react";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <aside className="w-72 h-screen bg-[url('/bgofsidebar.png')] bg-cover bg-center p-4 shadow-md">
      <ul className="space-y-4 text-white">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </li>
      </ul>
    </aside>
  );
};
