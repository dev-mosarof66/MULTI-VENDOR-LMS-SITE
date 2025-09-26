"use client";
import React, { useEffect } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { axiosInstance } from "./lib/axios";
import { setContent } from "./store/web-content";
import { useAppDispatch, useAppSelector } from "./hooks";

const Page = () => {
  const dispatch = useAppDispatch();
  const { content } = useAppSelector((state) => state.webContent);

  useEffect(() => {
    const getWebContent = async () => {
      try {
        console.log("Fetching content from /admin");
        const res = await axiosInstance.get("/admin");
        dispatch(setContent(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    getWebContent();
  }, [dispatch]);

  console.log("Rendering Home Page", content);

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
        <Footer  />
      </div>
    </div>
  );
};

export default Page;
