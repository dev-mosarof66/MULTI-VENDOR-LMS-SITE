import React from "react";
import Heading from "../utils/Heading";
import AdminHeader from "@/app/components/admin/AdminHeader";
import StatsCards from "@/app/components/admin/StatsCard";
import RecentActivities from "@/app/components/admin/RecentAct";
import EnrollmentsChart from "@/app/components/admin/Chats";
import QuickActions from "@/app/components/admin/QuickAction";
import Notifications from "@/app/components/admin/Notification";

const enrollmentsData = [
  { month: "Jan", enrollments: 200 },
  { month: "Feb", enrollments: 320 },
  { month: "Mar", enrollments: 280 },
  { month: "Apr", enrollments: 400 },
  { month: "May", enrollments: 350 },
  { month: "Jun", enrollments: 500 },
];
const revenueData = [
  { month: "Jan", enrollments: 15 },
  { month: "Feb", enrollments: 25 },
  { month: "Mar", enrollments: 10 },
  { month: "Apr", enrollments: 40 },
  { month: "May", enrollments: 70 },
  { month: "Jun", enrollments: 100 },
];

function Page() {
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-2">
      <Heading
        title="Home | Admin"
        description="Admin dashboard for coding learning platform"
        keywords="mern, web development, programming, admin"
      />
      <div className="w-full flex flex-col lg:flex lg:flex-row lg:items-center lg:justify-between gap-4">
        <AdminHeader />
        <QuickActions />
      </div>

      <main className="p-6 space-y-8">
        <StatsCards />
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnrollmentsChart data={enrollmentsData} title="Revenue History" />
          <EnrollmentsChart data={revenueData} title="Enrollment History" />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivities />
          <Notifications />
        </section>
      </main>
    </div>
  );
}

export default Page;
