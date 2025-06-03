"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { getProductById, getFeaturedProducts, Product } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Truck,
  ShieldCheck,
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";
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
    // Perubahan: Bungkus fetching dalam blok if dan ubah urutan setIsLoading
    if (params?.id) {
      const foundProduct = getProductById(params.id as string);
      if (foundProduct) {
        setProduct(foundProduct);
        const featured = getFeaturedProducts().filter(
          (p) => p.id !== foundProduct.id
        );
        setRelatedProducts(featured.slice(0, 4));
      }
    }
    setIsLoading(false); // dipindah ke akhir agar hanya dijalankan setelah proses selesai
  }, [params]);

  // Perubahan: logika jika produk tidak ditemukan setelah loading selesai
  if (!isLoading && !product) {
    notFound(); // next/navigation
  }

  // Loading state (tidak berubah)
  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-24 h-24 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handler kuantitas
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Handler tambah ke cart
  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black relative">
      {/* UI produk detail seharusnya ditempel di sini */}
      {/* Komponen untuk menampilkan detail produk */}
    </div>
  );
}
