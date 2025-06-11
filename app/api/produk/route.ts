import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/produk?page=&limit=
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "5");
  const skip = (page - 1) * limit;

  try {
    const [data, total] = await Promise.all([
      prisma.product.findMany({ orderBy: { name: "asc" }, skip, take: limit }),
      prisma.product.count(),
    ]);
    return NextResponse.json({
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/produk
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({ data: body });
    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
