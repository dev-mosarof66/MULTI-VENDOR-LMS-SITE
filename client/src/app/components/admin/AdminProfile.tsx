"use client";
import React, { useState } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";

function AdminSettingsPage() {
  const [profile, setProfile] = useState({
    name: "Admin Name",
    email: "admin@example.com",
    password: "",
    avatar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save profile logic here (API call)
    alert("Profile updated successfully!");
  };

  return (
    <div className="w-full text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 max-w-xl mx-auto">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt="Avatar"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                <Camera size={32} />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Upload avatar"
            />
          </div>
        </div>

        {/* Profile Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-[0.96] transition cursor-pointer duration-500 delay-75"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminSettingsPage;
