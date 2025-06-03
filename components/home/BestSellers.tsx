"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { bestSellerProducts } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const BestSellers = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "All" },
    { id: "engine", name: "Engine" },
    { id: "lighting", name: "Lighting" },
    { id: "exhaust", name: "Exhaust" },
  ];

  const filteredProducts = activeCategory === "all" 
    ? bestSellerProducts 
    : bestSellerProducts.filter(product => product.category === activeCategory);

  return (
    <section className="py-16 bg-black relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-red-950/10 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="font-creepster text-4xl text-red-600 mb-2">Best Sellers</h2>
          <p className="text-gray-400 text-center max-w-2xl mb-8">
            Bagian paling mengerikan yang pernah menghantui ribuan sepeda motor          </p>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className={cn(
                  "border border-red-900/30 hover:bg-red-950/50 hover:text-white",
                  activeCategory === category.id
                    ? "bg-red-900/30 text-white"
                    : "text-gray-400"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* View all button */}
        <div className="mt-12 text-center">
          <Button asChild className="bg-red-900 hover:bg-red-800 text-white border border-red-700">
            <Link href="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};