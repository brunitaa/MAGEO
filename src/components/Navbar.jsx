import React from "react";
import { ButtonLink } from "./ui/ButtonLink";
import LogoutButton from "./LogOut";

export function Navbar({}) {
  return (
    <nav className="bg-red dark:bg-univalleColorOne">
      <div className="flex items-center justify-between mx-auto max-w-screen-xl p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-2xl font-semibold whitespace-nowrap text-white dark:text-red">
            SIGEMUV
          </span>
        </a>
      </div>
    </nav>
  );
}
