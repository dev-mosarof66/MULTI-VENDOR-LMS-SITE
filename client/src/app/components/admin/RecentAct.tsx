import React from "react";

const recentActivities = [
  { id: 1, text: "🆕 New course added: React for Beginners" },
  { id: 2, text: "👩‍🎓 Student Sara enrolled in Node.js Mastery" },
  { id: 3, text: "👨‍🏫 Instructor John updated Python Basics" },
];

function RecentActivities() {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-3">Recent Activities</h3>
      <ul className="space-y-2 text-sm">
        {recentActivities.map((activity) => (
          <li
            key={activity.id}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {activity.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivities;
