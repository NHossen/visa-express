"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bgSlides = [
  {
    url: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=1600&auto=format&fit=crop&q=80",
    alt: "Canada visa guide – requirements, processing time and documents for Bangladesh nationals",
    country: "Canada",
    flag: "🇨🇦",
    tag: "Most Popular",
    tagColor: "bg-[#FED700] text-black",
    stat: "15–30 Days Processing",
  },
  {
    url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&auto=format&fit=crop&q=80",
    alt: "UK visa requirements and student visa guide for Bangladesh applicants",
    country: "United Kingdom",
    flag: "🇬🇧",
    tag: "Student Visa",
    tagColor: "bg-purple-500 text-white",
    stat: "3 Weeks Processing",
  },
  {
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&auto=format&fit=crop&q=80",
    alt: "Schengen visa guide – Europe visa requirements for Bangladesh passport holders",
    country: "Schengen Europe",
    flag: "🇪🇺",
    tag: "26 Countries",
    tagColor: "bg-blue-500 text-white",
    stat: "15 Days Processing",
  },
  {
    url: "https://images.unsplash.com/photo-1540339832862-474599807836?w=1600&auto=format&fit=crop&q=80",
    alt: "USA visa requirements and application guide for Bangladesh nationals",
    country: "United States",
    flag: "🇺🇸",
    tag: "Scholarship Guide",
    tagColor: "bg-rose-500 text-white",
    stat: "3–5 Weeks Processing",
  },
];

export default function BackgroundSlider() {
  const [bgIndex, setBgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const DURATION = 5000;

  useEffect(() => {
    setProgress(0);
    const step = 50;
    const increment = (step / DURATION) * 100;

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + increment;
      });
    }, step);

    const slideTimer = setInterval(() => {
      setBgIndex(prev => (prev + 1) % bgSlides.length);
      setProgress(0);
    }, DURATION);

    return () => {
      clearInterval(progressTimer);
      clearInterval(slideTimer);
    };
  }, [bgIndex]);

  const goTo = (i) => {
    setBgIndex(i);
    setProgress(0);
  };

  const slide = bgSlides[bgIndex];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">

      {/* ── BACKGROUND IMAGE ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slide.url}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── GRADIENT OVERLAY ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* ── COUNTRY BADGE — top left ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`badge-${bgIndex}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-8 left-6 flex items-center gap-2"
        >
          <span className={`text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${slide.tagColor}`}>
            {slide.tag}
          </span>
          <span className="text-white/60 text-xs font-medium">
            {slide.stat}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* ── COUNTRY NAME — bottom left ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${bgIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="absolute bottom-8 left-6 sm:left-10 "
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl text-amber-50">{slide.flag}</span>
            <div className=''>
              <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest">
                Visa Guide
              </p>
              <h2 className="text-white text-2xl sm:text-3xl font-black tracking-tight leading-none">
                {slide.country}
              </h2>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── DOT + PROGRESS INDICATORS — bottom center ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {bgSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative flex items-center justify-center cursor-pointer"
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === bgIndex ? (
              /* Active — pill with progress bar */
              <div className="relative w-10 h-2 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-[#FED700] rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            ) : (
              /* Inactive — small dot */
              <div className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-200" />
            )}
          </button>
        ))}
      </div>

      {/* ── SLIDE COUNT — bottom right ── */}
      <div className="absolute bottom-5 right-6 text-white/40 text-xs font-bold tracking-widest">
        {String(bgIndex + 1).padStart(2, '0')} / {String(bgSlides.length).padStart(2, '0')}
      </div>

    </div>
  );
}