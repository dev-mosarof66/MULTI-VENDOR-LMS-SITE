"use client";
import React from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

const Page = () => {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300">
      <Heading
        title="Home | Codemy"
        description="This is a coding learning platform"
        keywords="mern web development programming"
      />
      {/* content  */}
      <div>
        <Header />
        <Hero />
        <Courses />
        <About />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
