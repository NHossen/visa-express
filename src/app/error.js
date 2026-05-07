"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RefreshCcw, AlertCircle } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FFFBFB] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Red/Amber Warning Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-50/50 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[480px] w-full bg-white border border-red-50 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(220,38,38,0.08)] p-10 text-center z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
          Something went wrong
        </h2>
        <p className="text-gray-500 font-medium mb-8">
          An unexpected error occurred during your session. Our team has been notified.
        </p>

        {/* Error Code display (Subtle) */}
        <div className="mb-8 p-4 bg-gray-50 rounded-xl">
          <p className="text-[10px] font-mono text-gray-400 break-all">
            ID: {error.digest || "ERR_UNKNOWN_ORIGIN"}
          </p>
        </div>

        <button
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-2 py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 active:scale-[0.98] transition-all shadow-lg shadow-red-500/20"
        >
          <RefreshCcw className="w-5 h-5" />
          Try Again
        </button>

        <p className="mt-6 text-xs text-gray-400">
          If the problem persists, please contact support.
        </p>
      </motion.div>
    </div>
  );
}