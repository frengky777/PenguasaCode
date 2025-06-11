import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PUT /api/produk/[id]
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    let data: any;
    if (body.toggleStock) {
      const current = await prisma.product.findUnique({
        where: { id: params.id },
        select: { inStock: true },
      });
      const inStock = current?.inStock ?? false;
      data = { inStock: !inStock };
    } else {
      data = body;
    }
    const updated = await prisma.product.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json({ data: updated });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/produk/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
