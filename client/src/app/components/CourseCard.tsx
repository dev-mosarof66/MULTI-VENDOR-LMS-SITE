"use client";
import React from "react";
import { motion } from "motion/react";
import { MdOutlineStar } from "react-icons/md";
import Image from "next/image";

export type Course = {
  id: number;
  title: string;
  category: string;
  instructor: string;
  rating: number;
  price: string;
  image: string;
};

interface Props {
  course: Course;
}

const CourseCard = ({ course }: Props) => {
  return (
    <motion.div
      key={course.id}
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden cursor-pointer transition"
    >
      <Image
        src={course.image}
        alt={course.title}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {course.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {course.instructor}
        </p>

        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: 5 }, (_, i) => (
            <MdOutlineStar
              key={i}
              size={16}
              className={i < Math.floor(course.rating) ? "fill-yellow-500" : ""}
            />
          ))}
          <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
            {course.rating.toFixed(1)}
          </span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {course.price}
          </span>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition duration-300 delay-75">
            Enroll Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
