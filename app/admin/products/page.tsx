import { fetchAllProducts } from "@/lib/fetchDashboard";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProductClient } from "@/components/admin/product/ProductClient";

export default async function ProductsPage() {
  const products = await fetchAllProducts();

  return (
    <AdminLayout>
      <div className="p-6">
        <ProductClient initialProducts={products} />
      </div>
    </AdminLayout>
  );
}
