
"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloatingButton = () => {
  const phoneNumber = "971507078334"; // ✅ +971507078334 (no + for wa.me)
  const message = "Hello Visa Express Hub, I would like to inquire about your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] group"
      aria-label="Chat on WhatsApp"
    >
      {/* 🔹 Animated Pulse Rings */}
      <span className="absolute inset-0 inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
      <span className="absolute inset-0 inline-flex h-full w-full rounded-full bg-green-500 opacity-40 animate-pulse scale-125"></span>

      {/* 🔹 Main Button Icon */}
      <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-2xl transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
        <FaWhatsapp size={32} />
        
        {/* Optional Hover Tooltip */}
        <span className="absolute right-16 bg-white text-black text-xs font-bold px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-gray-100">
          Chat with us!
        </span>
      </div>
    </a>
  );
};

export default WhatsAppFloatingButton;