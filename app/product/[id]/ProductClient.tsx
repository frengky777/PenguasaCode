"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { getProductById, getFeaturedProducts, Product } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Star, Truck, ShieldCheck, ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductClient() {
  const params = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      const foundProduct = getProductById(params.id as string);
      if (foundProduct) {
        setProduct(foundProduct);
        const featured = getFeaturedProducts().filter(p => p.id !== foundProduct.id);
        setRelatedProducts(featured.slice(0, 4));
      }
    }
    setIsLoading(false);
  }, [params]);

  if (!isLoading && !product) {
    notFound();
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-24 h-24 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black relative">
      {/* Sama persis dengan isi return dari sebelumnya */}
      {/* Kamu bisa tempel ulang semua UI produk di sini seperti yang sudah kamu punya */}
      {/* Agar lebih ringkas, tidak aku ulang di sini karena sudah panjang dan tidak berubah */}
    </div>
  );
}
