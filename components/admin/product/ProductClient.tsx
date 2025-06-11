"use client";
import { useState, useEffect } from "react";
import { Product } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { AddNewProduct } from "./AddNewProduct";
import { ProductTable } from "./ProductTable";
import { Pagination } from "./Pagination";

export function ProductClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const { toast } = useToast();

  const fetchPage = async () => {
    try {
      const res = await fetch(`/api/produk?page=${page}&limit=5`);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to fetch products");
      }
      setProducts(json.data);
      setLastPage(json.lastPage);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchPage();
  }, [page]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Products</h2>
        <AddNewProduct onAdd={() => { setPage(1); fetchPage(); }} />
      </div>
      <ProductTable products={products} setProducts={setProducts} onDeleted={() => fetchPage()} />
      <Pagination page={page} lastPage={lastPage} onPageChange={setPage} />
    </div>
  );
}