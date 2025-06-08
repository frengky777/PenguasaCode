import { fetchAllProducts } from "@/lib/fetchData";
import { AdminLayout } from "@/components/admin/AdminLayout";
import ClientProductsTable from "./ClientProductsTable";

export default async function ProductsPage() {
  const products = await fetchAllProducts();

  return (
    <AdminLayout>
      <ClientProductsTable initialProducts={products} />
    </AdminLayout>
  );
}
