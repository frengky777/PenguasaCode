"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "engine",
    name: "Engine Parts",
    description: "Heart-stopping engine components to bring your bike to life",
    image: "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "exhaust",
    name: "Exhaust Systems",
    description: "Scream-inducing systems that howl like banshees",
    image: "https://images.pexels.com/photos/2626665/pexels-photo-2626665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "lighting",
    name: "Lighting",
    description: "Demonic illumination to pierce through the darkest nights",
    image: "https://images.pexels.com/photos/2549078/pexels-photo-2549078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "brakes",
    name: "Braking Systems",
    description: "Stopping power that grips like a ghost's cold hands",
    image: "https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const FeaturedCategories = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7794442/pexels-photo-7794442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-repeat opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-creepster text-4xl text-red-600 mb-3">Shop By Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
          Jelajahi koleksi suku cadang sepeda motor terkutuk kami, masing-masing dirancang untuk menghadirkan sentuhan teror pada perjalanan Anda           </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              href={`/shop?category=${category.id}`}
              key={category.id}
              className={cn(
                "group relative h-80 overflow-hidden rounded-lg border border-gray-800 bg-gray-950 transition-all duration-500",
                "hover:border-red-900/50 hover:shadow-lg hover:shadow-red-900/20",
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url(${category.image})`,
                    filter: "brightness(0.4) contrast(1.2)"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90" />
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-semibold text-white mb-2 font-creepster tracking-wider">
                  {category.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4 opacity-80">
                  {category.description}
                </p>
                <span className="text-red-500 text-sm font-medium flex items-center transition-transform duration-300 group-hover:translate-x-2">
                  Explore Category
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>

                {/* Blood drip overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-[url('https://images.pexels.com/photos/4571219/pexels-photo-4571219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-repeat-x bg-bottom opacity-0 group-hover:opacity-30 transition-opacity duration-500 transform rotate-180"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};