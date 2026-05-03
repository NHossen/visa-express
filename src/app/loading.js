"use client";
import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Container with a very soft, premium glow */}
      <div className="relative flex items-center justify-center">
        
        {/* The Outer Animated Ring */}
        <div className="absolute h-20 w-20 animate-ping rounded-full bg-yellow-400 opacity-20"></div>
        
        {/* The Glassy Center Circle */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-100 border-t-yellow-400"></div>
        </div>
      </div>

      {/* Minimalist Text Branding */}
      <div className="mt-8 flex flex-col items-center">
        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 animate-pulse">
          Visa Express Hub
        </span>
        <div className="mt-2 flex gap-1">
          <span className="h-1 w-1 rounded-full bg-yellow-400 animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-1 w-1 rounded-full bg-yellow-400 animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-1 w-1 rounded-full bg-yellow-400 animate-bounce"></span>
        </div>
      </div>

      {/* Subtle Bottom Credit */}
      <div className="absolute bottom-10">
        <p className="text-[8px] font-bold text-slate-200 uppercase tracking-widest">
          Secure Connection • Eammu Holidays
        </p>
      </div>
    </div>
  );
}