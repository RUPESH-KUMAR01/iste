"use client";

import React from "react";
import Image from "next/image";

const companies = [
  { name: "Google", logo: "/logos/google.svg", color: "group-hover:shadow-[0_0_20px_rgba(66,133,244,0.5)] group-hover:border-[#4285F4]" },
  { name: "Microsoft", logo: "/logos/microsoft.svg", color: "group-hover:shadow-[0_0_20px_rgba(0,164,239,0.5)] group-hover:border-[#00A4EF]" },
  { name: "PhonePe", logo: "/logos/phonepe.svg", color: "group-hover:shadow-[0_0_20px_rgba(91,33,182,0.5)] group-hover:border-[#5B21B6]" },
  { name: "Arista", logo: "/logos/arista.svg", color: "group-hover:shadow-[0_0_20px_rgba(0,102,204,0.5)] group-hover:border-[#0066CC]" },
  { name: "Oracle", logo: "/logos/oracle.svg", color: "group-hover:shadow-[0_0_20px_rgba(248,0,0,0.5)] group-hover:border-[#F80000]" },
  { name: "Wells Fargo", logo: "/logos/wellsfargo.svg", color: "group-hover:shadow-[0_0_20px_rgba(204,0,0,0.5)] group-hover:border-[#CC0000]" },
  { name: "Flipkart", logo: "/logos/flipkart.svg", color: "group-hover:shadow-[0_0_20px_rgba(40,116,240,0.5)] group-hover:border-[#2874F0]" },
  { name: "Visa", logo: "/logos/visa.svg", color: "group-hover:shadow-[0_0_20px_rgba(26,31,113,0.5)] group-hover:border-[#1A1F71]" },
  { name: "SAP Labs", logo: "/logos/saplabs.svg", color: "group-hover:shadow-[0_0_20px_rgba(0,157,224,0.5)] group-hover:border-[#009DE0]" },
  { name: "Amazon", logo: "/logos/amazon.svg", color: "group-hover:shadow-[0_0_20px_rgba(255,153,0,0.5)] group-hover:border-[#FF9900]" },
  { name: "Qualcomm", logo: "/logos/qualcomm.svg", color: "group-hover:shadow-[0_0_20px_rgba(0,102,177,0.5)] group-hover:border-[#0066B1]" },
  { name: "ExxonMobil", logo: "/logos/exxonmobil.svg", color: "group-hover:shadow-[0_0_20px_rgba(239,0,0,0.5)] group-hover:border-[#EF0000]" },
  { name: "citi", logo: "/logos/citi.svg", color: "group-hover:shadow-[0_0_20px_rgba(0,102,204,0.5)] group-hover:border-[#0066CC]" },
  
]
const row1 = companies.slice(0, 8);
const row2 = companies.slice(8, 15);

export default function Companies() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent py-20">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute bottom-20 right-1/4 h-3 w-3 animate-pulse rounded-full bg-teal-400 shadow-[0_0_15px_#2dd4bf]"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute right-10 top-1/2 h-1.5 w-1.5 animate-pulse rounded-full bg-white shadow-[0_0_8px_white]"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="flex flex-col items-center justify-center text-3xl font-bold tracking-tight text-white md:text-5xl">
            <span className="relative inline-block">
              Our <span className="text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.8)]">Cosmic</span> Network
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-linear-to-r from-teal-400 to-transparent" />
        </div>

        <div className="relative flex flex-col gap-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-linear-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-linear-to-l from-black to-transparent" />

          <div className="flex overflow-hidden">
            <div className="animate-marquee-left flex gap-6 py-4 pr-6 hover:[animation-play-state:paused]">
              {[...row1, ...row1].map((company, i) => (
                <div
                  key={`r1-${i}`}
                  className={`group flex h-28 w-48 shrink-0 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/3 backdrop-blur-md transition-all duration-300 ${company.color}`}
                >
                  <div className="relative h-12 w-12 transition-all duration-300 group-hover:scale-105">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors group-hover:text-white">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex overflow-hidden">
            <div className="animate-marquee-right flex gap-6 py-4 pr-6 hover:[animation-play-state:paused]">
              {[...row2, ...row2].map((company, i) => (
                <div
                  key={`r2-${i}`}
                  className={`group flex h-28 w-48 shrink-0 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/3 backdrop-blur-md transition-all duration-300 ${company.color}`}
                >
                  <div className="relative h-12 w-12 transition-all duration-300 group-hover:scale-105">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors group-hover:text-white">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marqueeLeft {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marqueeRight {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-marquee-left {
              animation: marqueeLeft 30s linear infinite;
              width: max-content;
            }
            .animate-marquee-right {
              animation: marqueeRight 30s linear infinite;
              width: max-content;
            }
          `,
        }}
      />
    </section>
  );
}
