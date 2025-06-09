'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { TransactionsTable } from "@/components/admin/TransactionsTable";
import { Separator } from "@/components/ui/separator";
import {
  Search, ArrowUpRight, BarChart4, ShoppingBag, DollarSign,
  Users, TrendingUp, Package, Truck, AlertCircle, ThumbsUp
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { cn } from "@/lib/utils";

interface TransactionWithUser {
  id: string;
  userId: number;
  status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  total: number;
  createdAt: Date;
  user: {
    name: string;
    email: string;
  };
}

interface DashboardProps {
  initialData: {
    transactions: TransactionWithUser[];
    chartData: { name: string; sales: number }[];
    stats: { id: number; title: string; value: string; change: string; icon: string }[];
    orderStatus: { name: string; value: number; color: string; icon: string }[];
  };
}

const iconMap: Record<string, JSX.Element> = {
  DollarSign: <DollarSign className="h-5 w-5 text-red-500" />,
  ShoppingBag: <ShoppingBag className="h-5 w-5 text-red-500" />,
  Users: <Users className="h-5 w-5 text-red-500" />,
  TrendingUp: <TrendingUp className="h-5 w-5 text-red-500" />,
  Package: <Package className="h-5 w-5" />,
  Truck: <Truck className="h-5 w-5" />,
  ThumbsUp: <ThumbsUp className="h-5 w-5" />,
  AlertCircle: <AlertCircle className="h-5 w-5" />,
};

export default function DashboardPage({ initialData }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionWithUser[]>(initialData.transactions);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredTransactions(
        initialData.transactions.filter((transaction) =>
          transaction.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredTransactions(initialData.transactions);
    }
  }, [searchQuery, initialData.transactions]);

  const { chartData, stats, orderStatus } = initialData;

  return (
    <AdminLayout>
      <div className="py-6">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400 mb-8">
          Welcome back, Admin. Here's what's happening with your store today.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={stat.id}
              className={cn(
                "border-gray-800 bg-gray-950 hover:bg-gray-900 transition-all",
                "hover:border-red-900/50 hover:shadow-md hover:shadow-red-900/10",
                loaded ? "translate-y-0 opacity-100" : "translate-y-[20px] opacity-0"
              )}
              style={{ transitionDelay: `${index * 100}ms`, transitionDuration: "500ms" }}
            >
              <CardContent className="flex items-center p-6">
                <div className="bg-gray-900 p-3 rounded-lg mr-4">
                  {iconMap[stat.icon]}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                    <span className="text-xs font-medium text-green-500 flex items-center">
                      {stat.change}
                      <ArrowUpRight className="h-3 w-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart + Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-gray-800 bg-gray-950 col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-white">Sales Overview</CardTitle>
                <p className="text-sm text-gray-400">Monthly sales performance</p>
              </div>
              <Button variant="outline" size="sm" className="h-8 border-gray-800">
                <BarChart4 className="h-4 w-4 mr-1" /> Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                    <XAxis dataKey="name" stroke="#6B7280" tickLine={false} axisLine={false} />
                    <YAxis stroke="#6B7280" tickLine={false} axisLine={false} tickFormatter={(value) => `Rp${value}`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '4px', color: '#F9FAFB' }}
                      formatter={(value) => [`Rp${value}`, 'Sales']}
                      cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                    />
                    <Bar dataKey="sales" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-950">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Order Status</CardTitle>
              <p className="text-sm text-gray-400">Current order distribution</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderStatus.map((status) => (
                  <div key={status.name} className="flex items-center">
                    <div className={`w-2 h-12 ${status.color} rounded-full mr-3`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          {iconMap[status.icon]}
                          <span className="ml-2 text-white">{status.name}</span>
                        </div>
                        <span className="text-white font-medium">{status.value}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full ${status.color}`} style={{ width: `${(status.value / 177) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card className="border-gray-800 bg-gray-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
              <p className="text-sm text-gray-400">
                Showing {filteredTransactions.length} out of {initialData.transactions.length} total transactions
              </p>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search transactions..."
                className="pl-10 border-gray-800 bg-gray-900 text-white w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <TransactionsTable transactions={filteredTransactions} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
