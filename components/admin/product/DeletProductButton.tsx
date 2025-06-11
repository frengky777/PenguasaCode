"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

interface DeleteProductButtonProps { id: string; onDelete: ()=>void; }
export function DeleteProductButton({ id, onDelete }: DeleteProductButtonProps) {
  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const confirmDelete = async ()=>{
    setLoading(true);
    const res = await fetch(`/api/produk/${id}`, { method:'DELETE' });
    setLoading(false);
    if(res.ok) onDelete(); else alert('Failed to delete');
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>Are you sure?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
          <Button onClick={confirmDelete} disabled={loading} variant="destructive">{loading?"Deleting...":"Delete"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}