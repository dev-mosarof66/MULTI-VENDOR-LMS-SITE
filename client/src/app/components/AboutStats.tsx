import React, { useEffect, useRef, useState } from "react";

type Stat = { id: string; label: string; value: number };

const statsSeed: Stat[] = [
  { id: "students", label: "Students", value: 55 },
  { id: "courses", label: "Courses", value: 5 },
  { id: "instructors", label: "Instructors", value: 3 },
];

function AboutStats() {
  // Stats animation
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(statsSeed.map((s) => [s.id, 0]))
  );
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsSeen, setStatsSeen] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStatsSeen(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // run counter
  useEffect(() => {
    if (!statsSeen) return;
    const timers: number[] = [];
    statsSeed.forEach((s) => {
      const duration = 1200; // ms
      const frameRate = 25;
      const steps = Math.ceil(duration / frameRate);
      const increment = s.value / steps;
      let current = 0;
      const id = window.setInterval(() => {
        current += increment;
        if (current >= s.value) {
          setCounts((prev) => ({ ...prev, [s.id]: s.value }));
          window.clearInterval(id);
        } else {
          setCounts((prev) => ({ ...prev, [s.id]: Math.floor(current) }));
        }
      }, frameRate);
      timers.push(id);
    });
    return () => timers.forEach((t) => clearInterval(t));
  }, [statsSeen]);


  return (
    <section className="border-t border-gray-100 text-black dark:text-purple-500 dark:border-gray-800">
      <div
        ref={statsRef}
        className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {statsSeed.map((s) => (
          <div
            key={s.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm"
          >
            <div className="text-3xl md:text-4xl font-extrabold">
              {counts[s.id]?.toLocaleString()}
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutStats;
