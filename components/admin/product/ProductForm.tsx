"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Product } from "@prisma/client";

interface ProductFormProps {
  onSuccess: (product: Product) => void;
}
export function ProductForm({ onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    oldPrice: null,
    description: "",
    image: "",
    category: "",
    rating: 0,
    inStock: true,
    featured: false,
    tags: [],
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "number" ? parseFloat(value) : name === "tags" ? value.split(",").map(t=>t.trim()) : value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const res = await fetch('/api/produk',{ method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify(form) });
    const json = await res.json(); setLoading(false);
    if(res.ok) onSuccess(json.data); else alert(json.error);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {["name","image","category","description"].map(f=>(<div key={f}><Label htmlFor={f}>{f}</Label><Input id={f} name={f} value={(form as any)[f]} onChange={handleChange} required/></div>))}
      {["price","oldPrice","rating"].map(f=>(<div key={f}><Label htmlFor={f}>{f}</Label><Input id={f} name={f} type="number" value={(form as any)[f]||""} onChange={handleChange}/></div>))}
      <div><Label htmlFor="tags">Tags (comma separated)</Label><Input id="tags" name="tags" value={form.tags.join(", ")} onChange={handleChange}/></div>
      <Button type="submit" disabled={loading}>{loading?"Saving...":"Save Product"}</Button>
    </form>
  );
}