import  {prisma}from "@/lib/prisma";

export async function fetchAllProducts() {
  return await prisma.product.findMany();
}
