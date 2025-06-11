"use client";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { ProductEditForm } from "./ProductEditForm";
import { DeleteProductButton } from "./DeletProductButton";
import { useToast } from "@/hooks/use-toast";

interface ProductTableProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onDeleted: () => void;
}

export function ProductTable({ products, setProducts, onDeleted }: ProductTableProps) {
  const { toast } = useToast();
  const handleToggle = async (id: string, current: boolean) => {
    const res = await fetch(`/api/produk/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ toggleStock: true }) });
    const json = await res.json();
    if (res.ok) {
      setProducts(prev => prev.map(p => p.id === id ? json.data : p));
    } else toast({ title: 'Error', description: json.error, variant: 'destructive' });
  };
  return (
    <div className="overflow-auto border rounded-md">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-t border-gray-700 hover:bg-gray-800">
              <td className="px-4 py-2">{p.id.slice(0,6)}...</td>
              <td className="px-4 py-2"><Image src={p.image} alt={p.name} width={40} height={40} className="rounded-md"/></td>
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.category}</td>
              <td className="px-4 py-2">${p.price.toFixed(2)}</td>
              <td className="px-4 py-2">{p.rating}</td>
              <td className="px-4 py-2"><Switch checked={p.inStock} onCheckedChange={()=>handleToggle(p.id,p.inStock)}/></td>
              <td className="px-4 py-2 flex gap-2">
                <ProductEditForm product={p} onSave={updated=>setProducts(prev=>prev.map(x=>x.id===updated.id?updated:x))}/>
                <DeleteProductButton id={p.id} onDelete={()=>{onDeleted();}}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
