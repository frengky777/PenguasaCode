"use client";

import { useState } from "react";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ProductTable } from "./ProductTable";
import { ProductForm } from "./ProductForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ProductClientProps {
  initialProducts: Product[];
}

export const ProductClient = ({ initialProducts }: ProductClientProps) => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Products</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-900 hover:bg-red-800">Add New Product</Button>
          </DialogTrigger>
          <DialogContent>
            <ProductForm
              onSuccess={(newProduct) => {
                setProducts((prev) => [...prev, newProduct]);
                setOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ProductTable products={products} setProducts={setProducts} />
    </div>
  );
};
