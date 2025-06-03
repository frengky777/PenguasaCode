"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { recentTransactions, allProducts } from "@/lib/data";
import { Suspense } from "react";
import { RevenueChartSkeleton } from "@/components/ui/skeleton";
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  TrendingUp,
  Package,
  Truck,
  AlertCircle,
  ThumbsUp,
  BarChart4,
  Search,
  ArrowUpRight
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { TransactionsTable } from "@/components/admin/TransactionsTable";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "Jun", sales: 2390 },
  { name: "Jul", sales: 3490 },
  { name: "Aug", sales: 3200 },
  { name: "Sep", sales: 2800 },
  { name: "Oct", sales: 4300 },
  { name: "Nov", sales: 5400 },
  { name: "Dec", sales: 6200 },
];

const monthlyStats = [
  { id: 1, title: "Total Revenue", value: "$9,842.77", change: "+12.5%", icon: <DollarSign className="h-5 w-5 text-red-500" /> },
  { id: 2, title: "Total Orders", value: "297", change: "+8.2%", icon: <ShoppingBag className="h-5 w-5 text-red-500" /> },
  { id: 3, title: "New Customers", value: "54", change: "+5.4%", icon: <Users className="h-5 w-5 text-red-500" /> },
  { id: 4, title: "Conversion Rate", value: "3.2%", change: "+1.1%", icon: <TrendingUp className="h-5 w-5 text-red-500" /> },
];

const orderStatusStats = [
  { name: "Pending", value: 25, icon: <Package className="h-5 w-5" />, color: "bg-yellow-500" },
  { name: "Shipped", value: 42, icon: <Truck className="h-5 w-5" />, color: "bg-blue-500" },
  { name: "Delivered", value: 98, icon: <ThumbsUp className="h-5 w-5" />, color: "bg-green-500" },
  { name: "Cancelled", value: 12, icon: <AlertCircle className="h-5 w-5" />, color: "bg-red-500" },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState(recentTransactions);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredTransactions(
        recentTransactions.filter(
          (transaction) =>
            transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredTransactions(recentTransactions);
    }
  }, [searchQuery]);

  return (
    <AdminLayout>
      <div className="py-6">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400 mb-8">
          Welcome back, Admin. Here's what's happening with your store today.
        </p>

        {/* Stats Cards */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {monthlyStats.map((stat, index) => (
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
                  {stat.icon}
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Chart */}
          <Card className="border-gray-800 bg-gray-950 col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-white">Sales Overview</CardTitle>
                <p className="text-sm text-gray-400">Monthly sales performance</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="h-8 border-gray-800">
                  <BarChart4 className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{
                      top: 20,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#6B7280"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#6B7280" 
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#F9FAFB'
                      }}
                      formatter={(value) => [`$${value}`, 'Sales']}
                      cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                    />
                    <Bar 
                      dataKey="sales" 
                      fill="hsl(var(--chart-1))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card className="border-gray-800 bg-gray-950">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Order Status</CardTitle>
              <p className="text-sm text-gray-400">Current order distribution</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderStatusStats.map((status) => (
                  <div key={status.name} className="flex items-center">
                    <div className={`w-2 h-12 ${status.color} rounded-full mr-3`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          {status.icon}
                          <span className="ml-2 text-white">{status.name}</span>
                        </div>
                        <span className="text-white font-medium">{status.value}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${status.color}`}
                          style={{ width: `${(status.value / 177) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-800">
                <h4 className="text-white font-medium mb-2">Summary</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Total Orders:</div>
                  <div className="text-white font-medium text-right">177</div>
                  <div className="text-gray-400">Completion Rate:</div>
                  <div className="text-white font-medium text-right">55.4%</div>
                  <div className="text-gray-400">Cancellation Rate:</div>
                  <div className="text-white font-medium text-right">6.8%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="border-gray-800 bg-gray-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
              <p className="text-sm text-gray-400">
                Showing {filteredTransactions.length} out of {recentTransactions.length} total transactions
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

        {/* Store Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="border-gray-800 bg-gray-950">
            <CardHeader>
              <CardTitle className="text-white">Store Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <dt className="text-gray-400">Total Products:</dt>
                  <dd className="text-white font-medium">{allProducts.length}</dd>
                </div>
                <Separator className="bg-gray-800" />
                <div className="flex justify-between items-center py-2">
                  <dt className="text-gray-400">Out of Stock Products:</dt>
                  <dd className="text-white font-medium">{allProducts.filter(p => !p.inStock).length}</dd>
                </div>
                <Separator className="bg-gray-800" />
                <div className="flex justify-between items-center py-2">
                  <dt className="text-gray-400">Categories:</dt>
                  <dd className="text-white font-medium">
                    {new Set(allProducts.map(p => p.category)).size}
                  </dd>
                </div>
                <Separator className="bg-gray-800" />
                <div className="flex justify-between items-center py-2">
                  <dt className="text-gray-400">Average Product Rating:</dt>
                  <dd className="text-white font-medium">
                    {(allProducts.reduce((acc, p) => acc + p.rating, 0) / allProducts.length).toFixed(1)}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card className="border-gray-800 bg-gray-950">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-auto py-4 flex flex-col items-center justify-center space-y-2 bg-red-900 hover:bg-red-800">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Add Product</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center space-y-2 border-gray-800 hover:bg-gray-900">
                  <Users className="h-5 w-5" />
                  <span>View Customers</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center space-y-2 border-gray-800 hover:bg-gray-900">
                  <Truck className="h-5 w-5" />
                  <span>Manage Orders</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center space-y-2 border-gray-800 hover:bg-gray-900">
                  <BarChart4 className="h-5 w-5" />
                  <span>Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}