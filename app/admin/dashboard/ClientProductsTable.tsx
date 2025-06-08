"use client";

import { useState, useEffect } from "react";
import {
  Plus, Search, Pencil, Trash2, AlertCircle, Filter, ArrowUpDown, Star
} from "lucide-react";
import { Product } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogTrigger, DialogClose
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Props = {
  initialProducts: Product[];
};

type SortField = "name" | "price" | "rating";
type SortDirection = "asc" | "desc";

export default function ClientProductsTable({ initialProducts }: Props) {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<'all' | 'in-stock' | 'out-of-stock'>('all');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const categories = ['all', ...Array.from(new Set(initialProducts.map(p => p.category)))];

  useEffect(() => {
    let filtered = [...initialProducts];

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.includes(searchQuery)
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (stockFilter === "in-stock") {
      filtered = filtered.filter(p => p.inStock);
    } else if (stockFilter === "out-of-stock") {
      filtered = filtered.filter(p => !p.inStock);
    }

    if (sortField) {
      filtered.sort((a, b) => {
        if (sortField === 'name') {
          return sortDirection === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortField === 'price') {
          return sortDirection === 'asc'
            ? a.price - b.price
            : b.price - a.price;
        } else if (sortField === 'rating') {
          return sortDirection === 'asc'
            ? a.rating - b.rating
            : b.rating - a.rating;
        }
        return 0;
      });
    }

    setProducts(filtered);
  }, [searchQuery, selectedCategory, stockFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const openDeleteDialog = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setProductToEdit(product);
    setIsEditDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!productToDelete) return;
    const updated = initialProducts.filter(p => p.id !== productToDelete.id);
    setProducts(updated);
    toast({
      title: "Product deleted",
      description: `${productToDelete.name} has been deleted.`,
    });
    setIsDeleteDialogOpen(false);
  };

 return (
  <AdminLayout>
    <div className="py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-gray-400">Manage your product catalog</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-gray-800 bg-gray-950 mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative col-span-1 md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search products by name, description, or ID..."
                className="pl-10 border-gray-800 bg-gray-900 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between border-gray-800 bg-gray-900 text-white">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      {selectedCategory === "all" ? "All Categories" : selectedCategory}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-gray-800">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "cursor-pointer capitalize",
                        selectedCategory === category && "bg-red-900/20 text-red-400"
                      )}
                    >
                      {category === "all" ? "All Categories" : category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Stock Filter */}
            <div>
              <Tabs value={stockFilter} onValueChange={(value) => setStockFilter(value as any)} className="w-full">
                <TabsList className="grid grid-cols-3 bg-gray-900 border border-gray-800">
                  <TabsTrigger value="all" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="in-stock"
                    className="data-[state=active]:bg-red-900/20 data-[state=active]:text-white"
                  >
                    In Stock
                  </TabsTrigger>
                  <TabsTrigger
                    value="out-of-stock"
                    className="data-[state=active]:bg-red-900/20 data-[state=active]:text-white"
                  >
                    Out
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border-gray-800 bg-gray-950">
        <CardContent className="p-0">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12">
              <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No Products Found</h3>
              <p className="text-gray-400 text-center mb-4">
                No products match your search criteria. Try adjusting your filters or search query.
              </p>
              <Button
                variant="outline"
                className="border-gray-800"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setStockFilter("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-gray-900/50">
                <TableRow className="border-gray-800 hover:bg-transparent">
                  <TableHead className="text-gray-400 w-[50px]">ID</TableHead>
                  <TableHead className="text-gray-400 w-[80px]">Image</TableHead>
                  <TableHead className="text-gray-400">
                    <button className="flex items-center text-left" onClick={() => handleSort("name")}>
                      Product Name
                      {sortField === "name" && (
                        <ArrowUpDown
                          className={cn("h-4 w-4 ml-1", sortDirection === "desc" && "transform rotate-180")}
                        />
                      )}
                    </button>
                  </TableHead>
                  <TableHead className="text-gray-400">Category</TableHead>
                  <TableHead className="text-gray-400">
                    <button className="flex items-center text-left" onClick={() => handleSort("price")}>
                      Price
                      {sortField === "price" && (
                        <ArrowUpDown
                          className={cn("h-4 w-4 ml-1", sortDirection === "desc" && "transform rotate-180")}
                        />
                      )}
                    </button>
                  </TableHead>
                  <TableHead className="text-gray-400">
                    <button className="flex items-center text-left" onClick={() => handleSort("rating")}>
                      Rating
                      {sortField === "rating" && (
                        <ArrowUpDown
                          className={cn("h-4 w-4 ml-1", sortDirection === "desc" && "transform rotate-180")}
                        />
                      )}
                    </button>
                  </TableHead>
                  <TableHead className="text-gray-400">Stock</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="border-gray-800">
                    <TableCell className="text-gray-500">{product.id}</TableCell>
                    <TableCell>
                      <div
                        className="w-12 h-12 bg-cover bg-center rounded border border-gray-800"
                        style={{ backgroundImage: `url(${product.image})` }}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-white">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-gray-700 text-gray-300 capitalize">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white">
                      ${product.price.toFixed(2)}
                      {"oldPrice" in product && product.oldPrice && (
                        <span className="text-gray-500 text-xs line-through ml-2">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="text-white mr-1">{product.rating}</span>
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Switch checked={product.inStock} className="data-[state=checked]:bg-green-600" />
                        <span
                          className={cn("ml-2 text-sm", product.inStock ? "text-green-500" : "text-red-500")}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-gray-800"
                          onClick={() => openEditDialog(product)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-gray-800 hover:bg-red-900/20 hover:text-red-500 hover:border-red-900/50"
                          onClick={() => openDeleteDialog(product)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          className="mt-4 md:mt-0 bg-red-800 hover:bg-red-700"
                          onClick={() => setIsAddDialogOpen(true)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Product
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  </AdminLayout>
 );
}
