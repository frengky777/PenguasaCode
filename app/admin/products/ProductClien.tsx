"use client";

import {
  Pencil,
  Trash2,
  Star,
  Plus,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  initialProducts: Product[];
};

export function ClientProducts({ initialProducts }: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [selected, setSelected] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  const handleStockToggle = async (product: Product) => {
    const res = await fetch(`/api/products/${product.id}`, {
      method: "PATCH",
      body: JSON.stringify({ inStock: !product.inStock }),
    });

    if (res.ok) {
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updated : p))
      );
    }
  };

  const handleDelete = async (id: string) => {
    const ok = confirm("Yakin ingin menghapus?");
    if (!ok) return;

    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (product: Product) => {
    setSelected(product);
    setForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
    });
  };

  const handleUpdate = async () => {
    if (!selected) return;
    const res = await fetch(`/api/products/${selected.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: form.name,
        price: parseFloat(form.price),
        category: form.category,
      }),
    });
    if (res.ok) {
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      setSelected(null);
    }
  };

  return (
    <div className="p-6 text-white space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" /> Add New Product
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-900 text-gray-400 uppercase">
            <tr>
              <th className="px-4 py-3 border-b border-gray-800">ID</th>
              <th className="px-4 py-3 border-b border-gray-800">Image</th>
              <th className="px-4 py-3 border-b border-gray-800">Product Name</th>
              <th className="px-4 py-3 border-b border-gray-800">Category</th>
              <th className="px-4 py-3 border-b border-gray-800">Price</th>
              <th className="px-4 py-3 border-b border-gray-800">Rating</th>
              <th className="px-4 py-3 border-b border-gray-800">Stock</th>
              <th className="px-4 py-3 border-b border-gray-800 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr key={p.id} className="border-b border-gray-800 hover:bg-gray-800">
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={40}
                    height={40}
                    className="rounded object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{p.name}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3 text-red-400">
                  Rp {p.price.toLocaleString("id-ID")}
                  {p.oldPrice && (
                    <span className="text-gray-500 line-through text-xs ml-2">
                      Rp {p.oldPrice.toLocaleString("id-ID")}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 flex items-center gap-1 text-yellow-400">
                  {p.rating.toFixed(1)}
                  <Star className="w-4 h-4 fill-yellow-400" />
                </td>
                <td className="px-4 py-3">
                  <Switch
                    checked={p.inStock}
                    onCheckedChange={() => handleStockToggle(p)}
                  />
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(p)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 text-white">
                      <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
                      <div className="space-y-3">
                        <div>
                          <Label>Nama</Label>
                          <Input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Harga</Label>
                          <Input
                            type="number"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Kategori</Label>
                          <Input
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                          />
                        </div>
                        <Button className="w-full mt-4" onClick={handleUpdate}>
                          Simpan Perubahan
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
