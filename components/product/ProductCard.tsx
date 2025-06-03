"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/lib/data";
import { ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      variant: "default",
    });
  };
  
  return (
    <Link href={`/product/${product.id}`}>
      <Card 
        className={cn(
          "group overflow-hidden bg-black border-gray-800 transition-all duration-300",
          "hover:border-red-900/50 hover:shadow-lg hover:shadow-red-900/10",
          featured && "md:col-span-2"
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Product image */}
        <div className="relative h-56 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
            style={{ 
              backgroundImage: `url(${product.image})`,
              filter: "brightness(0.8) contrast(1.1)"
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
          
          {/* Price tag */}
          <div className="absolute top-4 right-4 flex flex-col items-end">
            <div className="bg-red-900/80 text-white px-3 py-1 rounded-md font-medium">
              ${product.price.toFixed(2)}
            </div>
            {product.oldPrice && (
              <div className="text-gray-400 text-sm line-through mt-1">
                ${product.oldPrice.toFixed(2)}
              </div>
            )}
          </div>
          
          {/* Out of stock badge */}
          {!product.inStock && (
            <div className="absolute top-4 left-4 bg-black/80 text-red-500 px-3 py-1 rounded-md font-medium border border-red-900/30">
              Out of Stock
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="text-white text-lg font-medium mb-1 group-hover:text-red-500 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating) 
                      ? "text-yellow-500 fill-yellow-500" 
                      : "text-gray-600"
                  )}
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm ml-2">({product.rating})</span>
          </div>
          
          <p className="text-gray-400 text-sm line-clamp-2">
            {product.description}
          </p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            className={cn(
              "w-full transition-all duration-300",
              product.inStock ? "bg-red-900 hover:bg-red-800" : "bg-gray-800 cursor-not-allowed"
            )}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};