"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { TransactionsTable } from "@/components/admin/TransactionsTable";
import {
  Download,
  Calendar,
  Search
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// ✅ Kompatibel dengan komponen TransactionsTable
type TransactionWithUser = {
  id: string;
  userId: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  total: number;
  createdAt: Date;
  user: {
    name: string;
    email: string;
  };
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionWithUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to load transactions", error);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    const searchMatch =
      transaction.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase());

    const statusMatch = statusFilter === "all" || transaction.status === statusFilter;

    let dateMatch = true;
    if (date) {
      const transactionDate = new Date(transaction.createdAt);
      dateMatch =
        transactionDate.getDate() === date.getDate() &&
        transactionDate.getMonth() === date.getMonth() &&
        transactionDate.getFullYear() === date.getFullYear();
    }

    return searchMatch && statusMatch && dateMatch;
  });

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
            <p className="text-gray-400">Manage all customer transactions</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 border-gray-800 bg-gray-900/50 text-white">
            <Download className="h-4 w-4 mr-2" />
            Export Transactions
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-gray-800 bg-gray-950 mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative col-span-1 md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search by customer name, email, or transaction ID..."
                  className="pl-10 border-gray-800 bg-gray-900 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div>
                <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full">
                  <TabsList className="grid grid-cols-3 bg-gray-900 border border-gray-800">
                    <TabsTrigger value="all" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-white">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-white">
                      Pending
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-white">
                      Completed
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Date Filter */}
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-gray-800 bg-gray-900 text-white",
                        !date && "text-gray-400"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Filter by date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="bg-gray-900 text-white"
                    />
                    {date && (
                      <div className="p-3 border-t border-gray-800">
                        <Button
                          variant="ghost"
                          className="w-full text-red-500"
                          onClick={() => setDate(undefined)}
                        >
                          Clear Date
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="border-gray-800 bg-gray-950">
          <CardContent className="p-0">
            <TransactionsTable transactions={filteredTransactions} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}