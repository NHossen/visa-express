"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 selection:bg-yellow-100">
      {/* Background Aesthetic Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[400px] h-[400px] bg-yellow-200/30 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] bg-white/80 backdrop-blur-xl border border-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-10 z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="relative w-64 h-16 flex-shrink-0 -ml-1">
            <Image
              src="/visa_express_hub_log.png"
              alt="Visa Express Hub Logo"
              fill
              priority
              className="scale-150 origin-center" 
              style={{ objectFit: 'contain' }}
            />
          </Link>
          <p className="text-gray-400 text-sm font-medium mt-4 tracking-tight">
            {isLogin ? "Welcome back to the hub" : "Start your global journey"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">
              {isLogin ? "Sign In" : "Create Account"}
            </h2>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-[#FED700] focus:ring-4 focus:ring-[#FED700]/10 transition-all outline-none text-gray-900 placeholder:text-gray-300"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@email.com"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-[#FED700] focus:ring-4 focus:ring-[#FED700]/10 transition-all outline-none text-gray-900 placeholder:text-gray-300"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[13px] font-bold text-gray-700">Password</label>
                  {isLogin && (
                    <button className="text-[11px] font-bold text-gray-400 hover:text-black transition-colors">
                      Forgot?
                    </button>
                  )}
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-[#FED700] focus:ring-4 focus:ring-[#FED700]/10 transition-all outline-none text-gray-900 placeholder:text-gray-300"
                />
              </div>

              <button className="w-full py-4 mt-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 active:scale-[0.98] transition-all shadow-xl shadow-black/10">
                {isLogin ? "Sign In" : "Get Started"}
              </button>
            </form>

            {/* Social Auth */}
            <div className="mt-10">
              <div className="relative flex items-center justify-center mb-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <span className="relative px-4 text-[10px] font-bold uppercase tracking-[2px] text-gray-300 bg-white">Or Socials</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 py-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-gray-600 active:scale-95">
                  <span className="text-lg">G</span> Google
                </button>
                <button className="flex items-center justify-center gap-3 py-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-gray-600 active:scale-95">
                  <span className="text-lg text-blue-600">f</span> Facebook
                </button>
              </div>
            </div>

            {/* Switch State */}
            <div className="mt-10 text-center">
              <p className="text-gray-400 text-sm font-medium">
                {isLogin ? "New to the hub?" : "Already have an account?"}{" "}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-black font-black hover:underline underline-offset-4 decoration-2 decoration-[#FED700]"
                >
                  {isLogin ? "Create Account" : "Sign In"}
                </button>
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthPage;