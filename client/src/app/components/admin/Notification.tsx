import React from "react";

const notifications = [
  { id: 1, text: "⚠️ 2 courses pending approval" },
  { id: 2, text: "📩 New support ticket from Mike" },
];

function Notifications() {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-3">Notifications</h3>
      <ul className="space-y-2 text-sm">
        {notifications.map((note) => (
          <li
            key={note.id}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
