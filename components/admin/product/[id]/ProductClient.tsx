"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
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
import { ProductCard } from "@/components/product/ProductCard";
export type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    oldPrice?: number | null;
    description: string;
    image: string;
    category: string;
    rating: number;
    inStock: boolean;
    featured?: boolean | null;
    tags: string[];
  };
};
export function ProductClient() {
  const params = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params?.id) return;

      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) return setProduct(null);
        const data = await res.json();
        setProduct(data);

        const relatedRes = await fetch("/api/products/featured");
        if (relatedRes.ok) {
          const related = await relatedRes.json();
          setRelatedProducts(
            related.filter((p: Product) => p.id !== data.id).slice(0, 4)
          );
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (!isLoading && !product) {
    notFound();
  }

  if (isLoading || !product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-24 h-24 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black text-white px-4 md:px-16">
      <Link href="/" className="flex items-center mb-6 text-red-400 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg border border-gray-800"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center text-yellow-400 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 mr-1" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <div className="text-xl font-semibold text-red-500 mb-4">
            ${product.price.toFixed(2)}
            {product.oldPrice !== null && (
              <span className="text-gray-500 line-through ml-2 text-sm">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-gray-300 mb-6">{product.description}</p>

          <div className="flex items-center mb-4">
            <Badge className={product.inStock ? "bg-green-600" : "bg-red-600"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
            {product.featured && <Badge className="ml-2 bg-purple-700">Featured</Badge>}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 border border-gray-700 px-4 py-2 rounded">
              <Button size="icon" variant="ghost" onClick={decrementQuantity}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-lg font-medium">{quantity}</span>
              <Button size="icon" variant="ghost" onClick={incrementQuantity}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <Button className="flex items-center gap-2" onClick={addToCart}>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>

          <div className="flex gap-4 text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <Truck className="w-4 h-4" />
              Free Shipping
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              30-day Guarantee
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <Separator className="my-12" />
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={{
              ...p,
              oldPrice: p.oldPrice ?? null, // ensure compatibility if ProductCard expects `undefined` instead of `null`
            }}
          />
        ))}
      </div>
    </div>
  );
}
