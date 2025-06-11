"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { Product } from "@prisma/client";

interface AddNewProductProps { onAdd: () => void; }
export function AddNewProduct({ onAdd }: AddNewProductProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button>Add New Product</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Isi form untuk menambahkan produk baru.</DialogDescription>
        </DialogHeader>
        <ProductForm onSuccess={() => { onAdd(); setOpen(false); }} />
      </DialogContent>
    </Dialog>
  );
}