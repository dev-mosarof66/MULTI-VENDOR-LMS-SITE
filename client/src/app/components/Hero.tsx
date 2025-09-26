"use client";
import React, { useState } from "react";
import Image from "next/image";
import I1 from "@/assets/I1.jpeg";
import I2 from "@/assets/I2.jpeg";
import I3 from "@/assets/I3.jpeg";
import { useAppSelector } from "../hooks";
import HeroImg from '@/assets/hero-image.png'


const Hero = () => {
  const [search, setSearch] = useState("");
  const Avatars = [I1, I2, I3];
  const { content } = useAppSelector((state) => state.webContent);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", search);
  };

  return (
    <section
      id="Home"
      className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-32 gap-8"
    >
      {/* Left - Hero Image */}
      <div className="w-full md:w-1/2 flex justify-center relative">
        <div className="bg-gradient-to-bl from-purple-600 to-green-600 animate-pulse w-[80%] h-[80%] sm:w-[500px] sm:h-[500px] md:w-[90%] md:h-[90%] xl:w-[500px] xl:h-[500px] absolute p-2 bottom-4 rounded-full"/>
        <div className="w-[80%] h-[80%] sm:w-[500px] sm:h-[500px] md:w-[90%] md:h-[90%] xl:w-[500px] xl:h-[500px] absolute z-10 bottom-0 bg-white dark:bg-gray-900 rounded-full" />
        <div className="w-[90%] mx-auto max-w-md rounded-full relative z-20 -top-10 overflow-hidden">
          {content ? (
            <Image
              src={content.heroImage}
              alt="Hero"
              width={500}
              height={500}
              onContextMenu={(e) => e.preventDefault()}
              className="w-full rounded-lg"
            />
          ) : (
            <Image
              src={HeroImg}
              alt="Hero"
              width={500}
              height={500}
              onContextMenu={(e) => e.preventDefault()}
              className="w-full rounded-lg"
            />
          )}
        </div>
      </div>

      {/* Right - Text + Search */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-6">
        {content ? (
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {content.tagline || 'Learn to Code with Codemy'}
          </h1>
        ) : (
          <div className="skeleton h-14 w-3/4"></div>
        )}

        {content ? (
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            {content.subTagline || 'Your journey to becoming a coding pro starts here.'}
          </p>
        ) : (
          <div className="skeleton h-10 w-2/3"></div>
        )}

        {/* Search */}
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

        {/* Avatars + Community */}
        <div className="w-full flex flex-col sm:flex sm:flex-row sm:items-center md:flex-col md:items-start lg:flex-row lg:items-center gap-3 mt-6">
          <div className="flex -space-x-4">
            {Avatars.map((avt, ind) => (
              <Image
                key={ind}
                src={avt}
                alt="user"
                width={40}
                height={40}
                onContextMenu={(e) => e.preventDefault()}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white dark:border-gray-900 object-cover"
              />
            ))}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs sm:text-sm font-semibold border-2 border-white dark:border-gray-900">
              +99
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
            has already joined our communities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
