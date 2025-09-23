"use client";
import React, { useEffect, useMemo, useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import ThemeSetter from "./ThemeSetter";
import CTAButton from "./CTAButton";

const Navbar = () => {
  const nav = useMemo(() => ["Home", "Courses", "About", "FAQ"], []);
  const [handleNav, setHandleNav] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setHandleNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const sections = nav.map((id) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [nav]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex items-center justify-center fixed py-6 z-50  backdrop-blur-sm text-black dark:text-white"
    >
      <div className="w-full sm:w-[90%] mx-auto flex items-center justify-between fixed py-3 px-6">
        {/* Logo */}
        <h1 className="text-xl text-black dark:text-white font-bold">Codemy</h1>

        {/* Mobile Menu Icon */}
        <div className="block sm:hidden text-white cursor-pointer">
          <FaBars className="text-black dark:text-white" size={22} onClick={() => setHandleNav(true)} />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-center gap-6">
          {nav.map((item) => (
            <p
              key={item}
              onClick={() => scrollToSection(item)}
              className={`cursor-pointer text-sm transition-colors duration-300 ${
                activeTab === item
                  ? "text-purple-500 hover:text-purple-500/80"
                  : "text-gray-100 hover:text-gray-100/80"
              }`}
            >
              {item}
            </p>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <ThemeSetter />
          <CTAButton />
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {handleNav && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-screen fixed top-0 right-0 bg-black/50 flex justify-end gap-4 z-[998] text-black dark:text-white"
          >
            <div className="w-64 h-full bg-white dark:bg-gray-800 text-black dark:text-white p-6  flex flex-col items-start justify-between">
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex items-center justify-between">
                  <h2 className="font-semibold text-xl text-black dark:text-white">Codemy</h2>
                  <FaTimes
                    size={22}
                    className="cursor-pointer text-black dark:text-white hover:text-purple-600 active:scale-[0.95] transition-all duration-500 delay-75"
                    onClick={() => setHandleNav(false)}
                  />
                </div>
                {nav.map((item) => (
                  <p
                    key={item}
                    onClick={() => {
                      scrollToSection(item);
                      setHandleNav(false);
                      setActiveTab(item);
                    }}
                    className={`cursor-pointer text-sm transition-colors  duration-300 ${
                      activeTab === item
                        ? "text-purple-500 hover:text-purple-500/80"
                        : "text-black dark:text-white hover:text-gray-100/80"
                    }`}
                  >
                    {item}
                  </p>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <ThemeSetter />
                <CTAButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
