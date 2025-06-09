import {prisma} from "@/lib/prisma";

export async function fetchAllProducts() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });
  return products;
}
export async function getDashboardData() {
  const [transactions, products] = await Promise.all([
    prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { user: true },
    }),
    prisma.product.findMany(),
  ]);

  const chartData = Array.from({ length: 12 }, (_, i) => {
    const month = i;
    const name = new Date(0, month).toLocaleString("default", { month: "short" });
    const sales = transactions
      .filter((t) => new Date(t.createdAt).getMonth() === month)
      .reduce((sum, t) => sum + t.total, 0);
    return { name, sales };
  });

  const stats = [
    {
      id: 1,
      title: "Total Revenue",
      value: `Rp ${transactions.reduce((sum, t) => sum + t.total, 0).toLocaleString("id-ID")}`,
      change: "+12.5%",
      icon: "DollarSign",
    },
    {
      id: 2,
      title: "Total Orders",
      value: `${transactions.length}`,
      change: "+8.2%",
      icon: "ShoppingBag",
    },
    {
      id: 3,
      title: "New Customers",
      value: "54", // bisa dihitung pakai createdAt kalau tersedia
      change: "+5.4%",
      icon: "Users",
    },
    {
      id: 4,
      title: "Conversion Rate",
      value: "3.2%",
      change: "+1.1%",
      icon: "TrendingUp",
    },
  ];

  const orderStatus = [
    {
      name: "Pending",
      value: transactions.filter((t) => t.status === "PENDING").length,
      color: "bg-yellow-500",
      icon: "Package",
    },
    {
      name: "Shipped",
      value: transactions.filter((t) => t.status === "SHIPPED").length,
      color: "bg-blue-500",
      icon: "Truck",
    },
    {
      name: "Delivered",
      value: transactions.filter((t) => t.status === "DELIVERED").length,
      color: "bg-green-500",
      icon: "ThumbsUp",
    },
    {
      name: "Cancelled",
      value: transactions.filter((t) => t.status === "CANCELLED").length,
      color: "bg-red-500",
      icon: "AlertCircle",
    },
  ];

  return {
    transactions,
    products,
    chartData,
    stats,
    orderStatus,
  };
}
