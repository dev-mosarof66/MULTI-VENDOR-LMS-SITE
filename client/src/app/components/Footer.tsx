"use client";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { useAppSelector } from "../hooks";



const Footer = () => {
  const { content } = useAppSelector((state) => state.webContent);

  const socialIcons = [
    { icon: <FaFacebookF />, href: content ? content.facebook : "#" },
    { icon: <FaTwitter />, href: content ? content.twitter : "#" },
    { icon: <FaInstagram />, href: content ? content.instagram : "#" },
    { icon: <FaLinkedin />, href: content ? content.linkedin : "#" },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-12">
      <div className="w-full max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {/* About / Logo */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-purple-600">Codemy</h2>
          {content ? (
            <p className="text-gray-600 dark:text-gray-400">
              Practical, hands-on courses to level up your programming skills
              and launch your dev career.
            </p>
          ) : (
            <div className="skeleton h-5 w-3/4"></div>
          )}

          <div className="flex gap-3 mt-2">
            {content
              ? socialIcons.map((s, idx) => (
                  <Link
                    key={idx}
                    href={s.href}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
                  >
                    {s.icon}
                  </Link>
                ))
              : [...Array(4)].map((_, i) => (
                  <div key={i} className="skeleton w-8 h-8 rounded-full"></div>
                ))}
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg">Contact</h3>
          {content ? (
            <>
              <p>Email: {content.supportEmail}</p>
              <p>Phone: {content.phoneNo}</p>
              <p>Address: {content.address}</p>
            </>
          ) : (
            <>
              <div className="skeleton h-4 w-40"></div>
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-4 w-52"></div>
            </>
          )}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg">Subscribe</h3>
          <p>Get the latest courses and updates right in your inbox.</p>
          {content ? (
            <form className="w-full flex flex-col lg:flex lg:flex-row items-center gap-4 py-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              />
              <button className="w-full lg:w-fit text-sm px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 active:scale-[0.95] transition cursor-pointer duration-300 delay-75">
                Subscribe
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-3 w-full">
              <div className="skeleton h-10 w-full rounded-md"></div>
              <div className="skeleton h-10 w-24 rounded-md"></div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-700">
        © {new Date().getFullYear()} Codemy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
