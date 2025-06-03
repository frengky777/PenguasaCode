"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);       

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <div 
          className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center"
          style={{ 
            opacity: 0.4,
            filter: "brightness(0.4) contrast(1.2)"
          }}
        />
        {/* Fog overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
      </div>

      {/* Blood drip effect */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-[url('https://images.pexels.com/photos/4571219/pexels-photo-4571219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-repeat-x bg-top opacity-30"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 
            className={`font-creepster text-5xl md:text-7xl text-white mb-6 transition-all duration-1000 ${
              loaded ? "translate-x-0 opacity-100" : "translate-x-[-100px] opacity-0"
            }`}
          >
            <span className="text-red-600">Terrifying</span> Parts for Your <span className="text-red-600">Nightmare</span> Ride
          </h1>
          <p 
            className={`text-lg md:text-xl text-gray-300 mb-8 transition-all duration-1000 delay-300 ${
              loaded ? "translate-x-0 opacity-100" : "translate-x-[-100px] opacity-0"
            }`}
          >
            Temukan koleksi suku cadang sepeda motor premium kami yang mengagumkan yang akan mengubah sepeda motor Anda menjadi monster dari dunia bawah.
          </p>
          <div 
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"
            }`}
          >
            <Button asChild size="lg" className="bg-red-700 hover:bg-red-800 text-white border border-red-600/50 shadow-lg shadow-red-900/20 group">
              <Link href="/shop" className="font-medium">
                Shop Now
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-red-700/30 text-white hover:bg-red-950/30">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Animated flickering light */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
    </section>
  );
};