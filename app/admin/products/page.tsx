"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { allProducts, Product } from "@/lib/data";
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  AlertCircle, 
  Filter, 
  ArrowUpDown,
  Star
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type SortField = 'name' | 'price' | 'rating';
type SortDirection = 'asc' | 'desc';

export default function ProductsPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(allProducts);
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

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(allProducts.map(p => p.category)))];

  // Filter and sort products based on search, category, stock, and sort
  useEffect(() => {
    let filtered = [...allProducts];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.id.includes(searchQuery)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Apply stock filter
    if (stockFilter === 'in-stock') {
      filtered = filtered.filter(p => p.inStock);
    } else if (stockFilter === 'out-of-stock') {
      filtered = filtered.filter(p => !p.inStock);
    }
    
    // Apply sorting
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

  // Handle sort column clicks
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle delete product
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
    
    // Simulate product deletion
    const updatedProducts = allProducts.filter(p => p.id !== productToDelete.id);
    setProducts(updatedProducts);
    
    toast({
      title: "Product deleted",
      description: `${productToDelete.name} has been deleted successfully.`,
    });
    
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
            <p className="text-gray-400">Manage your product catalog</p>
          </div>
          {/* <Button className="mt-4 md:mt-0 bg-red-800 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button> */}
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
                        {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900 border-gray-800">
                    {categories.map(category => (
                      <DropdownMenuItem 
                        key={category} 
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          "cursor-pointer capitalize",
                          selectedCategory === category && "bg-red-900/20 text-red-400"
                        )}
                      >
                        {category === 'all' ? 'All Categories' : category}
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
                    <TabsTrigger value="in-stock" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-white">
                      In Stock
                    </TabsTrigger>
                    <TabsTrigger value="out-of-stock" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-white">
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
                      <button 
                        className="flex items-center text-left"
                        onClick={() => handleSort('name')}
                      >
                        Product Name
                        {sortField === 'name' && (
                          <ArrowUpDown className={cn(
                            "h-4 w-4 ml-1",
                            sortDirection === 'desc' && "transform rotate-180"
                          )} />
                        )}
                      </button>
                    </TableHead>
                    <TableHead className="text-gray-400">Category</TableHead>
                    <TableHead className="text-gray-400">
                      <button 
                        className="flex items-center text-left"
                        onClick={() => handleSort('price')}
                      >
                        Price
                        {sortField === 'price' && (
                          <ArrowUpDown className={cn(
                            "h-4 w-4 ml-1",
                            sortDirection === 'desc' && "transform rotate-180"
                          )} />
                        )}
                      </button>
                    </TableHead>
                    <TableHead className="text-gray-400">
                      <button 
                        className="flex items-center text-left"
                        onClick={() => handleSort('rating')}
                      >
                        Rating
                        {sortField === 'rating' && (
                          <ArrowUpDown className={cn(
                            "h-4 w-4 ml-1",
                            sortDirection === 'desc' && "transform rotate-180"
                          )} />
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
                      <TableCell className="font-medium text-white">
                        {product.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-700 text-gray-300 capitalize">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white">
                        ${product.price.toFixed(2)}
                        {product.oldPrice && (
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
                          <Switch 
                            checked={product.inStock} 
                            className="data-[state=checked]:bg-green-600"
                          />
                          <span className={cn(
                            "ml-2 text-sm",
                            product.inStock ? "text-green-500" : "text-red-500"
                          )}>
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
                          onClick={() => openEditDialog(product)} // tambahkan ini
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
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-950 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="text-gray-400">
            Are you sure you want to delete the product <span className="text-white font-medium">{productToDelete?.name}</span>? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-gray-800"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
  <DialogContent className="bg-gray-950 border-gray-800">
    <DialogHeader>
      <DialogTitle className="text-white">Edit Product</DialogTitle>
    </DialogHeader>
    {productToEdit && (
<form
  onSubmit={(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProduct = {
      ...productToEdit,
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      description: formData.get("description") as string,
    };

    const updatedProducts = allProducts.map((p) =>
      p.id === productToEdit.id ? updatedProduct : p
    );
    setProducts(updatedProducts);

    toast({
      title: "Product updated",
      description: `${updatedProduct.name} has been updated successfully.`,
    });

    setIsEditDialogOpen(false);
    setProductToEdit(null);
  }}
>
        <div className="space-y-4">
          <Input
            name="name"
            defaultValue={productToEdit.name}
            placeholder="Product Name"
            className="bg-gray-900 text-white border-gray-800"
          />
          <Input
            name="price"
            type="number"
            defaultValue={productToEdit.price}
            placeholder="Price"
            className="bg-gray-900 text-white border-gray-800"
          />
          <Input
            name="description"
            defaultValue={productToEdit.description}
            placeholder="Description"
            className="bg-gray-900 text-white border-gray-800"
          />
        </div>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            className="border-gray-800"
            type="button"
            onClick={() => setIsEditDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    )}
  </DialogContent>
</Dialog>
<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
  <DialogContent className="bg-gray-950 border-gray-800">
    <DialogHeader>
      <DialogTitle className="text-white">Add New Product</DialogTitle>
    </DialogHeader>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newProduct: Product = {
          id: (Date.now()).toString(), // generate ID unik
          name: formData.get("name") as string,
          price: parseFloat(formData.get("price") as string),
          description: formData.get("description") as string,
          image: formData.get("image") as string || "/placeholder.png",
          category: formData.get("category") as string || "uncategorized",
          rating: 0,
          inStock: true,
          featured: false,
        };

        setProducts([newProduct, ...products]);

        toast({
          title: "Product added",
          description: `${newProduct.name} has been added successfully.`,
        });

        setIsAddDialogOpen(false);
      }}
    >
      <div className="space-y-4">
        <Input name="name" placeholder="Product Name" className="bg-gray-900 text-white border-gray-800" />
        <Input name="price" type="number" placeholder="Price" className="bg-gray-900 text-white border-gray-800" />
        <Input name="description" placeholder="Description" className="bg-gray-900 text-white border-gray-800" />
        <Input name="image" placeholder="Image URL" className="bg-gray-900 text-white border-gray-800" />
        <Input name="category" placeholder="Category" className="bg-gray-900 text-white border-gray-800" />
      </div>
      <DialogFooter className="mt-4">
        <Button 
          variant="outline" 
          className="border-gray-800" 
          type="button" 
          onClick={() => setIsAddDialogOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit">Add</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
    </AdminLayout>
  );
}