import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { featured: true },
    take: 8,
  });

  return NextResponse.json(products);
}
