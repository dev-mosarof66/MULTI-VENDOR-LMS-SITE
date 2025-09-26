"use client";
import React from "react";
import AboutHero from "./AboutHero";
import AboutStats from "./AboutStats";
import InstructorPanel from "./InstructorPanel";
import Testimonial from "./Testimonial";
import { useAppSelector } from "../hooks";



export default function About() {
  const { content } = useAppSelector((state) => state.webContent);

  return (
    <main
      id="About"
      className="w-full bg-white dark:bg-gradient-to-b dark:from-black dark:to-gray-900 duration-300 py-12"
    >
      <div className="w-full sm:w-[85%] mx-auto">
        {/* AboutHero with skeleton placeholder */}
        {content ? (
          <AboutHero  />
        ) : (
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] skeleton rounded-xl mb-12"></div>
        )}

        {/* Stats section */}
        {content ? (
          <AboutStats />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-12">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="skeleton h-20 w-full rounded-lg"
              ></div>
            ))}
          </div>
        )}

        {/* Instructor + Testimonial */}
        {content ? (
          <>
            <InstructorPanel />
            <Testimonial />
          </>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="skeleton h-40 w-full rounded-lg"></div>
            <div className="skeleton h-40 w-full rounded-lg"></div>
          </div>
        )}
      </div>
    </main>
  );
}

export function MiniStat({ title, value }: { title: string; value: string }) {
  const isLoading = !title || !value;

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center shadow-sm">
      <div className="text-sm text-gray-500 dark:text-gray-300">
        {isLoading ? <div className="skeleton h-4 w-16 mx-auto"></div> : title}
      </div>
      <div className="font-semibold mt-1">
        {isLoading ? <div className="skeleton h-6 w-12 mx-auto"></div> : value}
      </div>
    </div>
  );
}
