import React from 'react';

export default function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img 
      src="https://i.postimg.cc/hG55H46f/Bg.png" 
      alt="Leak X Viral Logo" 
      className={`${className} object-contain transition-transform duration-300 group-hover:scale-105 select-none`}
      referrerPolicy="no-referrer"
    />
  );
}

