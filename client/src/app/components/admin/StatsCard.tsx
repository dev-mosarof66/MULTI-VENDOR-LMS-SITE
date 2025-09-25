import React from "react";
import { BookOpen, Users, GraduationCap, DollarSign } from "lucide-react";

const stats = [
  { label: "Total Courses", value: 5, icon: BookOpen, color: "text-blue-500" },
  { label: "Total Students", value: 15, icon: Users, color: "text-green-500" },
  { label: "Instructors", value: 3, icon: GraduationCap, color: "text-purple-500" },
  { label: "Revenue", value: "$12", icon: DollarSign, color: "text-yellow-500" },
];

function StatsCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md flex items-center gap-4"
          >
            <Icon className={item.color} size={28} />
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <h2 className="text-xl font-bold">{item.value}</h2>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default StatsCards;
