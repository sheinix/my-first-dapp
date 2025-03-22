import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <aside className="w-72 h-screen bg-[url('/bgofsidebar.png')] bg-cover bg-center p-4 shadow-md flex flex-col">
      {/* Logo at the top */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2 w-full overflow-hidden -ml-2">
          <div className="w-18 h-18">
            <Image src="/logo.png" alt="Logo" width={100} height={100} className="object-contain" />
          </div>
          <h1 className="text-white text-xl font-bold tracking-wide whitespace-nowrap">PowerChain Ltd.</h1>
        </div>

        {/* Navigation menu */}
        <ul className="space-y-4 text-white">
          <li>
            <Link href="/" className="hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">
              Transactions
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="hover:underline">
              Billing
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">
              Account
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">
              Log out
            </Link>
          </li>
        </ul>
      </div>

      {/* Optional: Add a small footer here if needed */}
    </aside>
  );
};
