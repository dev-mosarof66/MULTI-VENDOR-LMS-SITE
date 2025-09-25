"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  itemName: string;
  content: string;
};

function DeleteModal({ isOpen, onClose, itemName, content }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onClose(false)}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-96 p-6">
              <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
              <div>
                <p className="mb-4">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-pink-500">{itemName}</span>?
                </p>
                <p className="text-sm text-yellow-300 ">{content}</p>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => onClose(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 active:scale-[0.96] cursor-pointer duration-300 delay-75"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onClose(false)}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 active:scale-[0.96] cursor-pointer duration-300 delay-75"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default DeleteModal;
