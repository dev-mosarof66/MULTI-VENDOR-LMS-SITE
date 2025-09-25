import React from "react";
import { Home, Users, Settings, LogOut } from "lucide-react";
import { IoBookmarks } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import LogoutModal from "../Logout";

export const menuItems = [
  { name: "Home", icon: <Home size={18} />, href: "/admin" },
  {
    name: "Manage Students",
    icon: <Users size={18} />,
    href: "/admin/manage-students",
  },
  {
    name: "Manage Courses",
    icon: <IoBookmarks size={18} />,
    href: "/admin/manage-courses",
  },
  { name: "Settings", icon: <Settings size={18} />, href: "/admin/settings" },
];

function AdminSidebar() {
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

  return (
    <>
      {!isLogin && (
        <aside className="w-72 xl:w-72 2xl:w-96 min-h-screen bg-gray-100 dark:bg-gray-900 shadow-md  flex-col justify-between hidden md:flex">
          {/* Top section */}
          <div>
            <div className="p-4 border-b border-gray-300 dark:border-gray-700">
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Admin Panel
              </h1>
            </div>

            <nav className="mt-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 ${
                    activePath.toLocaleLowerCase() ===
                    item.href.toLocaleLowerCase()
                      ? "text-purple-700"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                  }  rounded-md transition`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Bottom logout */}
          <div className="p-4 border-t border-gray-300 dark:border-gray-700">
            <button onClick={()=> setLogoutOpen(true)} className="flex items-center gap-2 text-red-600 hover:text-red-700 w-full active:scale-[0.95] cursor-pointer transition duration-300 delay-75">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>
      )}

      <LogoutModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
}

export default AdminSidebar;
