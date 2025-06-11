"use client";
import { Button } from "@/components/ui/button";

interface PaginationProps { page:number; lastPage:number; onPageChange:(p:number)=>void; }
export function Pagination({ page, lastPage, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <Button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>Prev</Button>
      <span className="text-white">{page} / {lastPage}</span>
      <Button onClick={() => onPageChange(page + 1)} disabled={page >= lastPage}>Next</Button>
    </div>
  );
}
