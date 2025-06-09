// app/api/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();

  const newProduct = await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      image: data.image,
      category: data.category,
      rating: data.rating,
      inStock: data.inStock,
    },
  });

  return NextResponse.json(newProduct);
}
