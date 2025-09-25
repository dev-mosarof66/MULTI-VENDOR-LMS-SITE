"use client"; 

import React, { useState } from "react";
import Heading from "@/app/utils/Heading";
import { Trash2 } from "lucide-react";
import DeleteModal from "@/app/components/DeleteModal";

// Mock data for now
const studentsData = [
  { id: 1, name: "Sara Khan", email: "sara@example.com", courses: 3, status: "Active" },
  { id: 2, name: "John Doe", email: "john@example.com", courses: 2, status: "Inactive" },
  { id: 3, name: "Mary Jane", email: "mary@example.com", courses: 5, status: "Active" },
];

function StudentsPage() {
  const [search, setSearch] = useState("");
  const [deleteModal,setDeleteModal] = useState(false)

  // Filter students based on search
  const filteredStudents = studentsData.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen text-gray-900 dark:text-gray-100 p-6">
      <Heading
        title="Manage Students | Admin"
        description="Manage all students in the coding learning platform"
        keywords="admin, students, coding platform"
      />

      <h1 className="text-2xl font-bold mb-4">Manage Students</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-4 py-2 w-full max-w-md border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-trasparent focus:ring-2 focus:ring-blue-500"
      />

      {/* Students Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Courses</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b border-gray-200 dark:border-gray-800">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2">{student.courses}</td>
                <td className="px-4 py-2">{student.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={()=> setDeleteModal(true)} title="button" className="p-1 text-red-600 hover:text-red-800 cursor-pointer duration-300 delay-75">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <DeleteModal
        onClose={setDeleteModal}
        isOpen={deleteModal}
        itemName='Mosarof'
        content="This request will be observed for 72 hours. You can undo this request within 72 hours."
        />
    </div>
  );
}

export default StudentsPage;
