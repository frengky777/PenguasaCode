import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        oldPrice: body.oldPrice ?? null,
        description: body.description,
        image: body.image,
        category: body.category,
        rating: body.rating,
        inStock: body.inStock,
        featured: body.featured ?? false,
        tags: body.tags ?? [],
      },
    });

    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/produk error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
