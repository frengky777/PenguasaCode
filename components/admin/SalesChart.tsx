"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ✅ Gunakan prop agar bisa pakai data dinamis dari server (jika nanti dibutuhkan)
type Props = {
  data: { name: string; sales: number }[];
};

// ✅ Jika tidak dikirim data, fallback ke dummy
const defaultData = [
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

export default function SalesChart({ data = defaultData }: Props) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            vertical={false}
          />
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
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "4px",
              color: "#F9FAFB",
            }}
            formatter={(v) => [`$${v}`, "Sales"]}
            cursor={{ fill: "rgba(107, 114, 128, 0.1)" }}
          />
          <Bar
            dataKey="sales"
            fill="hsl(var(--chart-1))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
