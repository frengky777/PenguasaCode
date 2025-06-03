"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Michael Myers",
    role: "Speed Demon",
    content: "These parts transformed my bike into a terrifying beast. The engine purrs like a demon from the underworld. 10/10 would haunt the streets again.",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    name: "Freddy Krueger",
    role: "Night Rider",
    content: "I've been riding for 20 years, and these are the most spine-chilling parts I've ever installed. My bike now strikes fear into everyone who hears it approaching.",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    name: "Samantha Ghostly",
    role: "Track Phantom",
    content: "The attention to detail is frightening. Each part feels like it was forged in hell itself. My bike has never performed better, or looked more menacing.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Animated fog background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3854816/pexels-photo-3854816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center animate-pulse" style={{ animationDuration: '15s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-creepster text-4xl text-red-600 mb-3">Haunting Testimonials</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dengarkan kisah mengerikan dari mereka yang selamat setelah memasang komponen kami          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Testimonial cards */}
          <div className="relative h-[300px]">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={cn(
                  "absolute inset-0 border-gray-800 bg-black/60 backdrop-blur transition-all duration-500",
                  activeIndex === index 
                    ? "opacity-100 scale-100 z-10" 
                    : "opacity-0 scale-95 z-0"
                )}
              >
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-red-600/50 mb-4" />
                  <p className="text-lg text-gray-300 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-full bg-cover bg-center mr-4 border border-red-900/30"
                      style={{ backgroundImage: `url(${testimonial.avatar})` }}
                    />
                    <div>
                      <h4 className="text-white font-medium">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Dots navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index 
                    ? "bg-red-600 w-4" 
                    : "bg-gray-600 hover:bg-red-600/50"
                )}
                onClick={() => setActiveIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};