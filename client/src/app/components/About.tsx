"use client";
import React from "react";
import AboutHero from "./AboutHero";
import AboutStats from "./AboutStats";
import InstructorPanel from "./InstructorPanel";
import Testimonial from "./Testimonial";

export default function About() {
  return (
    <main
      id="About"
      className="w-full  bg-white dark:bg-gradient-to-b dark:from-black dark:to-gray-900 duration-300"
    >
      <div className="w-full sm:w-[85%] mx-auto">
        <AboutHero />
        <AboutStats />
        <InstructorPanel />
        <Testimonial />
      </div>
    </main>
  );
}

export function MiniStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center shadow-sm">
      <div className="text-sm text-gray-500 dark:text-gray-300">{title}</div>
      <div className="font-semibold mt-1">{value}</div>
    </div>
  );
}
