"use client";
import React, { useState } from "react";
import CourseCard, { Course } from "./CourseCard";
import C1 from '@/assets/C1.jpeg';
import C2 from '@/assets/C2.jpeg';
import C3 from '@/assets/C3.jpeg';
import C4 from '@/assets/C4.png';

const dummyCourses: Course[] = [
  {
    id: 1,
    title: "React for Beginners",
    category: "Web Development",
    instructor: "Jane Doe",
    rating: 4.8,
    price: "$49",
    image: C1,
  },
  {
    id: 2,
    title: "Mastering Python",
    category: "Programming",
    instructor: "John Smith",
    rating: 4.7,
    price: "$59",
    image: C2,
  },
  {
    id: 3,
    title: "UI/UX Design Essentials",
    category: "Design",
    instructor: "Emily Clark",
    rating: 4.9,
    price: "$69",
    image: C3,
  },
  {
    id: 4,
    title: "Fullstack with Next.js",
    category: "Web Development",
    instructor: "Chris Lee",
    rating: 4.6,
    price: "$79",
    image: C4,
  },
];

const categories = [
  "Recent",
  "Popular",
  "All",
  "Web Development",
  "Programming",
  "Design",
];

function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const leftCategories = categories.slice(0, 2);
  const rightCategories = categories.slice(2);

  const filteredCourses = dummyCourses.filter((course) => {
    return selectedCategory === "All" || course.category === selectedCategory;
  });

  return (
    <section
      id="Courses"
      className="w-full sm:w-[85%] mx-auto  min-h-screen py-20 px-4"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Explore Our Courses
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn new skills and advance your career with our curated courses.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Left Categories */}
        <div className="flex gap-3 flex-wrap">
          {leftCategories.map((cat, ind) => (
            <CourseTab
              key={ind}
              cat={cat}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          ))}
        </div>

        {/* Right Categories */}
        <div className="flex gap-3 flex-wrap">
          {rightCategories.map((cat,ind) => (
            <CourseTab
              key={ind}
              cat={cat}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
            No courses found.
          </p>
        )}
      </div>
    </section>
  );
}

type TabProps = {
  cat: string;
  selectedCategory: string;
  setSelectedCategory: (setSelectedCategory: string) => void;
};

export const CourseTab = ({
  cat,
  setSelectedCategory,
  selectedCategory,
}: TabProps) => {
  return (
    <div
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      className={`px-4 py-2 rounded-full border transition ${
        selectedCategory === cat
          ? "bg-purple-600 text-white border-purple-600"
          : "bg-white dark:bg-gray-800 dark:text-gray-300 text-gray-700 border-gray-300 dark:border-gray-600 hover:bg-purple-100 dark:hover:bg-purple-700/30"
      } cursor-pointer duration-300 delay-75`}
    >
      {cat}
    </div>
  );
};

export default Courses;
