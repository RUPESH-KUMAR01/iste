"use client";

import Image from "next/image";
import Link from "next/link";

export function SigCard({ 
  title, 
  image, 
  description, 
  link 
}: { 
  title: string; 
  image: string;
  description: string;
  link: string;
}) {

  return (
    <div className="group relative w-full h-72 rounded-3xl bg-[#0c0c14] overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(124,58,237,0.3)]">
      
      {/* 1. THE IMAGE CONTAINER */}
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-20">
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain scale-90 transition-transform duration-700 group-hover:scale-100"
          />
        </div>
      </div>

      {/* 2. THE VIGNETTE FIX (The Magic Layer) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-30"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, #0c0c14 70%)',
        }}
      />

      {/* 3. OPTIONAL: Extra Bottom Fade for Text Readability */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#0c0c14] via-[#0c0c14]/80 to-transparent" />

      {/* 4. TEXT CONTENT - Default State */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center justify-end translate-y-2 group-hover:translate-y-0 transition-all duration-500 group-hover:opacity-0 pointer-events-none">
        <h2 className="text-xl font-bold font-display text-white tracking-wider uppercase drop-shadow-md group-hover:text-primary transition-colors">
          {title}
        </h2>
        <div className="w-8 h-1 bg-primary rounded-full mt-3 opacity-0 group-hover:opacity-100 group-hover:w-16 transition-all duration-500" />
      </div>

      {/* 5. HOVER CONTENT - Description + Read More */}
      <div className="absolute inset-0 p-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto">
        
        {/* Title on Hover
        <h2 className="text-2xl font-bold font-display text-white tracking-wider uppercase mb-4 text-center">
          {title}
        </h2>
         */}
        {/* Description */}
        <p className="text-gray-300 text-center text-sm leading-relaxed mb-6 max-w-xs line-clamp-4">
          {description}
        </p>
        
        {/* Read More Button */}
        <Link 
          href={link}
          className=" relative px-6 py-2.5 bg-primary/10 border border-primary/50 rounded-full text-primary font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary"
        >
          <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10">Read More</span>
        </Link>
      </div>
    </div>
  );
}