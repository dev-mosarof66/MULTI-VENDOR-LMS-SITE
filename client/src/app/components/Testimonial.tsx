import React from "react";
import MarqueeComp from "./MarqueeComp";

export type Testimonial = {
  id: number;
  name: string;
  text: string;
  role: string;
};

const testimonialsSeed: Testimonial[] = [
  {
    id: 1,
    name: "Rahim",
    role: "Frontend Dev",
    text: "Codemy transformed my career — excellent courses and instructors!",
  },
  {
    id: 2,
    name: "Maya",
    role: "Software Engineer",
    text: "Hands-on projects, clear explanations. I built a real product in 2 months.",
  },
  {
    id: 3,
    name: "Omar",
    role: "Data Analyst",
    text: "The Python track was superb — practical and relevant.",
  },
];

function Testimonial() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 text-black dark:text-white">
      <h3 className="text-2xl sm:text-3xl font-bold text-center">
        What learners say
      </h3>
      <div className="mt-6 relative">
        <div className="overflow-hidden">
          {testimonialsSeed.map((t, i) => (
            <MarqueeComp key={i} t={t} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonial;
