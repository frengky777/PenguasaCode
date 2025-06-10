import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: body.toggleStock
        ? { inStock: { set: undefined } } // ini diperbaiki di bawah
        : body,
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("❌ PUT /api/produk/[id] error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ DELETE /api/produk/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
