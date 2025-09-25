import React from "react";
import { Plus, Settings } from "lucide-react";
import Link from "next/link";

function QuickActions() {
  return (
    <div className="px-8">
      <div className="flex gap-3 items-center ">
        <Link
          href="/admin/manage-courses"
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer active:scale-[0.95] duration-300
         delay-75"
        >
          <Plus size={18} />
          <span className="hidden xs:block  md:hidden lg:block"> Add </span>Course
        </Link>
        <Link
          href="/admin/settings"
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700  cursor-pointer active:scale-[0.95] duration-300
         delay-75"
        >
          <Settings size={18} />
          <span className="hidden xs:block md:hidden lg:block">Manage </span>Settings
        </Link>
      </div>
    </div>
  );
}

export default QuickActions;
