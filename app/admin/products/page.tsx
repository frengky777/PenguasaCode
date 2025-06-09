import { fetchAllProducts } from "../../../lib/fetchDashboard";
import { ClientProducts } from "./ProductClien"; 
import { AdminLayout } from "@/components/admin/AdminLayout";

export default async function ProductsPage() {
  const products = await fetchAllProducts();

  return (
    <AdminLayout>
      <ClientProducts initialProducts={products} />
    </AdminLayout>
  );
}
