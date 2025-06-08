import { fetchAllProducts } from "@/lib/fetchData";
import ClientProductsTable from "../dashboard/ClientProductsTable";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default async function ProductsPage() {
  const products = await fetchAllProducts();

  return (
    <AdminLayout>
      <ClientProductsTable initialProducts={products} />
    </AdminLayout>
  );
}
