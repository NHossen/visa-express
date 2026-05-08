"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Scroll() {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-8 left-3 md:left-12 z-50">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex items-center gap-3"
          >
            {/* Circular Icon Button */}
            <button
              onClick={scrollToTop}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50"
              aria-label="Scroll to top"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#f8cb00]"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>

       {/* Pill "Scroll to Top" Button - Hidden on mobile, visible on medium screens and up */}
<button
  onClick={scrollToTop}
  className="hidden md:block rounded-[20px] bg-[#f8cb00] px-8 py-4 text-lg font-medium text-white shadow-lg transition-opacity hover:opacity-90"
>
  Scroll to Top
</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}