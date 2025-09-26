"use client";

import React, { useState } from "react";
import Heading from "@/app/utils/Heading";
import { Plus, Edit, Trash2 } from "lucide-react";
import DeleteModal from "@/app/components/DeleteModal";

// Dummy courses data
const initialCourses = [
  {
    id: 1,
    title: "React for Beginners",
    category: "Frontend",
    students: 120,
    price: "$49",
  },
  {
    id: 2,
    title: "Node.js Mastery",
    category: "Backend",
    students: 85,
    price: "$59",
  },
  {
    id: 3,
    title: "Python Basics",
    category: "Programming",
    students: 200,
    price: "$39",
  },
];

function ManageCoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleAddCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      title: `New Course ${courses.length + 1}`,
      category: "General",
      students: 0,
      price: "$0",
    };
    setCourses([...courses, newCourse]);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6">
      <Heading
        title="Manage Courses | Admin"
        description="Manage all courses in the coding learning platform"
        keywords="admin, courses, coding platform"
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Courses</h1>
        <button
          onClick={handleAddCourse}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm bg-purple-600 text-white  hover:bg-purple-700 active:scale-[0.95]  cursor-pointer duration-300 delay-75"
        >
          <Plus size={18} /> Add Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Students</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <>
                <tr
                  key={course.id}
                  className="border-b border-gray-200 dark:border-gray-800"
                >
                  <td className="px-4 py-2">{course.title}</td>
                  <td className="px-4 py-2">{course.category}</td>
                  <td className="px-4 py-2">{course.students}</td>
                  <td className="px-4 py-2">{course.price}</td>
                  <td className="px-4 py-2 flex gap-4">
                    <button
                      title="edit"
                      className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 active:scale-[0.95] cursor-pointer duration-300 delay-75"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      title="delete"
                      onClick={()=> setDeleteModal(true)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:scale-[0.95] cursor-pointer duration-300 delay-75"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
                <DeleteModal
                  isOpen={deleteModal}
                  onClose={setDeleteModal}
                  itemName={course.title}
                  content=""
                />
              </>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* modal  */}
    </div>
  );
}

export default ManageCoursesPage;
