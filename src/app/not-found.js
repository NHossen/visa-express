"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center z-10"
      >
        <div className="relative w-48 h-12 mx-auto mb-12">
          <Image
            src="/visa_express_hub_log.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>

        <h1 className="text-[120px] font-black text-black leading-none tracking-tighter opacity-10 select-none">
          404
        </h1>
        
        <div className="mt-[-40px]">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Lost in Transit?</h2>
          <p className="text-gray-500 font-medium mb-10 leading-relaxed">
            The page you're looking for has either moved or doesn't exist. Let's get your journey back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/10"
            >
              <Home className="w-4 h-4" />
              Back Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}