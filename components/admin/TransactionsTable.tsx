"use client";

import { Transaction } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  // Status badge styling
  const getStatusBadge = (status: Transaction["status"]) => {
    switch(status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-900/20 text-yellow-400 border-yellow-800">Pending</Badge>;
      case "shipped":
        return <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-800">Shipped</Badge>;
      case "delivered":
        return <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-900/20 text-red-400 border-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-400">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-900/50">
          <TableRow className="border-gray-800 hover:bg-transparent">
            <TableHead className="text-gray-400 w-[100px]">ID</TableHead>
            <TableHead className="text-gray-400">Customer</TableHead>
            <TableHead className="text-gray-400">Date</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
            <TableHead className="text-gray-400">Items</TableHead>
            <TableHead className="text-gray-400 text-right">Total</TableHead>
            <TableHead className="text-gray-400 text-right w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="border-gray-800">
              <TableCell className="font-medium text-white">{transaction.id}</TableCell>
              <TableCell>
                <div>
                  <p className="text-white">{transaction.customerName}</p>
                  <p className="text-gray-400 text-sm">{transaction.customerEmail}</p>
                </div>
              </TableCell>
              <TableCell className="text-gray-400">
                {format(new Date(transaction.date), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                {getStatusBadge(transaction.status)}
              </TableCell>
              <TableCell className="text-gray-400">
                {transaction.products.length} {transaction.products.length === 1 ? "item" : "items"}
              </TableCell>
              <TableCell className="text-right font-medium text-white">
                ${transaction.total.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                    <DropdownMenuItem className="text-white cursor-pointer">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white cursor-pointer">
                      Edit Status
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 cursor-pointer">
                      Cancel Order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}