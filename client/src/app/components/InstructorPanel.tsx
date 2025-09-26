import React from "react";
import { motion } from "motion/react";
import { FaTwitter, FaGithub } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";
import I1 from "@/assets/I1.jpeg";
import I2 from "@/assets/I2.jpeg";
import I3 from "@/assets/I3.jpeg";

type TeamMember = {
  name: string;
  role: string;
  avatar: StaticImageData;
  twitter?: string;
  github?: string;
};

const teamSeed: TeamMember[] = [
  {
    name: "Sara Ahmed",
    role: "Lead Instructor",
    avatar: I1,
    twitter: "#",
    github: "#",
  },
  {
    name: "Alex Johnson",
    role: "Curriculum Head",
    avatar: I2,
    twitter: "#",
    github: "#",
  },
  {
    name: "Priya Singh",
    role: "Frontend Mentor",
    avatar: I3,
    twitter: "#",
    github: "#",
  },
];

function InstructorPanel() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12  text-black dark:text-purple-500">
      <h3 className="text-2xl sm:text-3xl font-bold text-center">
        Meet Our Instructor
      </h3>
      <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
        The Best Quality Instructor from Industry
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {teamSeed.map((m) => (
          <motion.article
            key={m.name}
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center shadow"
          >
            <Image
              src={m.avatar}
              alt={m.name}
              onContextMenu={(e) => e.preventDefault()}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover shadow-sm"
            />
            <h4 className="mt-4 font-semibold">{m.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">{m.role}</p>
            <div className="mt-3 flex gap-3">
              {m.twitter && (
                <a
                  aria-label="twitter"
                  href={m.twitter}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
                >
                  <FaTwitter />
                </a>
              )}
              {m.github && (
                <a
                  aria-label="github"
                  href={m.github}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
                >
                  <FaGithub />
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default InstructorPanel;
