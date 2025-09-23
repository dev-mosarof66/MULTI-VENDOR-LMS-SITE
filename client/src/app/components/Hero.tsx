"use client";
import React, { useState } from "react";
import Image from "next/image";
import HeroImg from "@/assets/hero-image.png";
// type Props = {}

const Hero = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", search);
    // Implement search logic here
  };

  return (
    <section
      id="Home"
      className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-20 gap-8"
    >
      {/* Left - Hero Image */}
      <div className="w-full md:w-1/2 flex justify-center relative">
        <div className="bg-gradient-to-bl from-purple-600 to-green-600 animate-pulse w-[80%] h-[80%] sm:w-[500px] sm:h-[500px] md:w-[90%] md:h-[90%] xl:w-[500px] xl:h-[500px] absolute p-2 bottom-4 rounded-full"></div>
        <div className="w-[80%] h-[80%] sm:w-[500px] sm:h-[500px] md:w-[90%] md:h-[90%] xl:w-[500px] xl:h-[500px] absolute z-10 bottom-0 bg-white dark:bg-gray-900 rounded-full" />
        <div className="w-[90%] mx-auto max-w-md rounded-full">
          <Image
            src={HeroImg}
            alt="Hero"
            className="w-full rounded-lg relative z-20 -top-10"
          />
        </div>
      </div>

      {/* Right - Text + Search */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-6">
        {/* Tagline */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Learn Coding, Build Your Future
        </h1>

        {/* Sub tagline */}
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
          Join thousands of students mastering web development, programming, and
          more.
        </p>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="w-full flex flex-col sm:flex-row gap-3 mt-4"
        >
          <input
            type="text"
            placeholder="Search for courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:flex-1 h-12 px-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="h-12 px-6 bg-purple-500 text-white font-medium rounded-md hover:bg-purple-600 active:scale-[.95] transition cursor-pointer duration-300 delay-75"
          >
            Search
          </button>
        </form>
        <div className="w-full flex flex-col sm:flex sm:flex-row items-start sm:items-center  gap-3 mt-6">
          {/* Avatars */}
          <div className="flex -space-x-4">
            <img
              src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
              alt="user"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white dark:border-gray-900 object-cover"
            />
            <img
              src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
              alt="user"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white dark:border-gray-900 object-cover"
            />
            <img
              src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp"
              alt="user"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white dark:border-gray-900 object-cover"
            />
            {/* Overlay +99 */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs sm:text-sm font-semibold border-2 border-white dark:border-gray-900">
              +99
            </div>
          </div>

          {/* Text */}
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
            has already joined our communities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
