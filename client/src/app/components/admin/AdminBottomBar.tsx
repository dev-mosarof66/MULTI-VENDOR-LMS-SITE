"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { menuItems } from "./AdminSidebar";
import LogoutModal from "../Logout";
import { MdLogout } from "react-icons/md";

function AdminBottomBar() {
  const path = usePathname();
  const isLogin = path === "/admin/login" ? true : false;
  const [activePath, setActivePath] = useState("/admin/home");
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogout = () => {
    // Perform logout logic (API call, clear tokens, redirect)
    console.log("Logged out");
  };

  //fetch the path
  useEffect(() => {
    setActivePath(path);
  }, [activePath, path]);

  if (isLogin) {
    return null;
  }

  return (
    <div>
      <nav className=" md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 shadow-inner border-t border-gray-200 dark:border-gray-800 flex justify-around py-2 ">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activePath.toLocaleLowerCase() === item.href.toLocaleLowerCase()
                ? "text-purple-700"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            }  rounded-md transition`}
          >
            {item.icon}
          </Link>
        ))}
        <div
          onClick={() => {
            handleLogout();
            setLogoutOpen(true)
          }}
          className="px-4 py-2 rounded-lg text-red-600  hover:text-red-700 cursor-pointer active:scale-[0.95] duration-300 delay-75"
        >
          <MdLogout size={20} />
        </div>
      </nav>
      <LogoutModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default AdminBottomBar;
