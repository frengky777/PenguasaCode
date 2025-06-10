"use client";

import { useState } from "react";
import { Product } from "@prisma/client";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ProductEditFormProps {
  product: Product;
  onSave: (updated: Product) => void;
}

export function ProductEditForm({ product, onSave }: ProductEditFormProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({ ...product });

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/produk/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        toast({ title: "Product Updated", description: form.name });
        onSave(data.data);
        setOpen(false);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to update product", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label>Image URL</Label>
            <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          </div>
          <div>
            <Label>Category</Label>
            <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <div>
            <Label>Price</Label>
            <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })} />
          </div>
          <div>
            <Label>Rating</Label>
            <Input type="number" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
        </div>
        <AlertDialog open={confirm} onOpenChange={setConfirm}>
          <AlertDialogTrigger asChild>
            <Button className="mt-4 w-full">Save Changes</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to save changes?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}
