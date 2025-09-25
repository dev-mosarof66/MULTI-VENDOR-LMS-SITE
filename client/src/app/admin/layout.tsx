"use client";
import React, { ReactNode } from "react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminBottomBar from "@/app/components/admin/AdminBottomBar";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300">
      <div className="w-full h-screen flex items-center">
        <AdminSidebar />
        <div className="w-full h-full overflow-y-scroll">{children}</div>
      </div>
      <AdminBottomBar />
    </div>
  );
}

export default Layout;
