"use client";

import { useState } from "react";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ProductEditForm } from "./ProductEditForm";
import Image from "next/image";

interface ProductTableProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export function ProductTable({ products: initialProducts }: ProductTableProps) {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/produk/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleToggleStock = async (id: string, current: boolean) => {
    const res = await fetch(`/api/produk/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inStock: !current }),
    });

    if (res.ok) {
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updated.data : p))
      );
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full text-sm text-white bg-black border border-gray-800">
        <thead>
          <tr className="bg-zinc-900 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Rating</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-gray-800 hover:bg-zinc-800">
              <td className="p-3">{p.id.slice(0, 6)}...</td>
              <td className="p-3">
                <Image src={p.image} alt={p.name} width={40} height={40} className="rounded-md object-cover" />
              </td>
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">${p.price.toFixed(2)}</td>
              <td className="p-3">{p.rating}</td>
              <td className="p-3">
                <Switch
                  checked={p.inStock}
                  onCheckedChange={() => handleToggleStock(p.id, p.inStock)}
                />
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  <ProductEditForm
                    product={p}
                    onSave={(updated) =>
                      setProducts((prev) =>
                        prev.map((prod) => (prod.id === updated.id ? updated : prod))
                      )
                    }
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
