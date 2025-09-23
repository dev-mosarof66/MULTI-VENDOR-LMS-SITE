"use client";
import React from "react";
import { MdOutlineCode, MdSchool, MdRocketLaunch } from "react-icons/md";
import AboutBanner from "@/assets/about-banner.avif";
import Image from "next/image";
const tagline =
  "Practical, hands-on courses crafted by industry instructors. Build projects, get feedback, and launch your dev career.";

const features = [
  {
    icon: <MdOutlineCode size={22} />,
    title: "Real Projects",
    desc: "Build production-style projects.",
  },
  {
    icon: <MdSchool size={22} />,
    title: "Guided Learning",
    desc: "Step-by-step curriculum.",
  },
  {
    icon: <MdRocketLaunch size={22} />,
    title: "Career Help",
    desc: "Resume & interview prep.",
  },
];

function AboutHero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left - Text */}
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-center md:text-left">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Who We Are?
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 active:scale-[0.97] transition cursor-pointer duration-300 delay-75">
              Start Learning
            </a>
            <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer duration-300 delay-75">
              Explore Courses
            </a>
          </div>

          {/* Dynamic Feature List */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {features.map((f, idx) => (
              <Feature key={idx} icon={f.icon} title={f.title} desc={f.desc} />
            ))}
          </div>
        </div>

        {/* Right - Visual / Illustration */}
        <div className="relative flex items-center justify-center">
          <div className="relative z-10 w-full sm:w-96 sm:h-60 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={AboutBanner}
              alt="coding"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-purple-600 mt-1">{icon}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">{desc}</div>
      </div>
    </div>
  );
}

export default AboutHero;
