import React, { useEffect, useState } from "react";
import { ButtonLink } from "./ui/ButtonLink";
import LogoutButton from "./LogOut";

export function Navbar({ isAdmin }) {
  return (
    <>
      <nav className="bg-white border-red-200 dark:bg-red-900">
        <div className="flex flex-wrap justify-between Ítems-center mx-auto max-w-screen-xl p-4">
          <a href="/" className="flex Ítems-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SIGEMUV</span>
          </a>
        </div>
      </nav>
      
    </>
  );
}
