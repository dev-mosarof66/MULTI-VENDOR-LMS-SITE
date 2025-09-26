"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const FAQ = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    // Simulate fetching from API
    const fetchFAQs = async () => {
      const data: FAQItem[] = [
        {
          id: 1,
          question: "How do I enroll in a course?",
          answer:
            'Click "Enroll" on any course page and follow the checkout process.',
        },
        {
          id: 2,
          question: "Can I get a refund?",
          answer:
            "Refunds are available within 14 days of purchase if you are not satisfied.",
        },
        {
          id: 3,
          question: "Do you provide certificates?",
          answer:
            "Yes! Every completed course comes with a certificate of completion.",
        },
      ];
      setFaqs(data);
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <section
      id="FAQ"
      className="w-full bg-white dark:bg-gray-900 mx-auto px-6 py-6 sm:py-18"
    >
      <div className="w-full sm:w-[90%] mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Frequently Asked Questions
        </h1>

        <div className="w-full sm:w-[60%] mx-auto flex flex-col gap-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <span className="text-purple-600 dark:text-purple-400">
                  {openId === faq.id ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 1 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-4 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
