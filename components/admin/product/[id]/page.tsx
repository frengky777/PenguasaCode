import { ProductClient } from "./ProductClient";
import { getFeaturedProducts } from "@/lib/data";

export default function ProductPage() {
  return <ProductClient />;
}

export async function generateStaticParams() {
  const products = getFeaturedProducts(); // atau ganti dengan getAllProducts()
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
