"use client";
import { useState } from "react";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

interface ProductEditFormProps { product: Product; onSave: (p:Product)=>void; }
export function ProductEditForm({ product, onSave }: ProductEditFormProps) {
  const [open,setOpen] = useState(false);
  const [form,setForm] = useState(product);
  const [loading,setLoading] = useState(false);
  const submitEdit = async ()=>{
    setLoading(true);
    const res = await fetch(`/api/produk/${product.id}`, { method:'PUT',headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
    const json = await res.json(); setLoading(false);
    if(res.ok) { onSave(json.data); setOpen(false); } else alert(json.error);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update fields then save.</DialogDescription>
        </DialogHeader>
        <Input value={form.name} onChange={e=>setForm(prev=>({...prev,name:e.target.value}))} />
        <DialogFooter>
          <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
          <Button onClick={submitEdit} disabled={loading}>{loading?"Saving...":"Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}