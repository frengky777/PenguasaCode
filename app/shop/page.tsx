"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ProductCard } from "@/components/product/ProductCard";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, SlidersHorizontal, Search, FilterX } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { allProducts, Product } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

// Get unique categories
const categories = Array.from(new Set(allProducts.map(p => p.category)));

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    setLoaded(true);
    const categoryParam = searchParams?.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  // Filter products based on search term, price range, categories, and stock
  useEffect(() => {
    let filtered = allProducts;
    
    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Price range filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    // In stock filter
    if (inStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }
    
    setProducts(filtered);
  }, [searchTerm, priceRange, selectedCategories, inStockOnly]);

  // Handle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 300]);
    setSelectedCategories([]);
    setInStockOnly(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black relative">
      {/* Spooky background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-red-950/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-red-950/10 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="font-creepster text-4xl md:text-5xl text-red-600 mb-4">Shop of Horrors</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
          Jelajahi koleksi suku cadang sepeda motor terkutuk kami, masing-masing dirancang dengan sihir gelap dan direkayasa untuk teror maksimum di jalan.
          </p>
        </div>

        {/* Mobile filter toggle */}
        <div className="md:hidden mb-6">
          <Button 
            onClick={() => setIsFilterOpen(!isFilterOpen)} 
            variant="outline" 
            className="w-full flex items-center justify-center border-gray-800"
          >
            {isFilterOpen ? (
              <>
                <FilterX className="h-4 w-4 mr-2" />
                Hide Filters
              </>
            ) : (
              <>
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Show Filters
              </>
            )}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <div 
            className={cn(
              "w-full md:w-64 flex-shrink-0 transition-all duration-300 overflow-hidden",
              isFilterOpen ? "max-h-[1000px]" : "max-h-0 md:max-h-[1000px]"
            )}
          >
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-6 sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <h3 className="text-white font-medium mb-3">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 border-gray-800 bg-black text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-white font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 300]}
                    min={0}
                    max={300}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6 bg-gray-800" />
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-white font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                        className="border-gray-700 data-[state=checked]:bg-red-800 data-[state=checked]:border-red-800"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-gray-300 capitalize cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-6 bg-gray-800" />
              
              {/* Stock Filter */}
              <div className="mb-6">
                <div className="flex items-center">
                  <Checkbox
                    id="in-stock"
                    checked={inStockOnly}
                    onCheckedChange={(checked) => setInStockOnly(!!checked)}
                    className="border-gray-700 data-[state=checked]:bg-red-800 data-[state=checked]:border-red-800"
                  />
                  <label
                    htmlFor="in-stock"
                    className="ml-2 text-gray-300 cursor-pointer"
                  >
                    In Stock Only
                  </label>
                </div>
              </div>
              
              {/* Reset Filters */}
              <Button 
                variant="outline" 
                className="w-full mt-2 border-gray-800 hover:bg-red-900/20 hover:border-red-900/50"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 bg-gray-950 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl text-white mb-2">No products found</h3>
                <p className="text-gray-400 text-center mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={resetFilters} className="bg-red-900 hover:bg-red-800">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <>
                <p className="text-gray-400 mb-4">
                  Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                </p>
                <div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {products.map((product, i) => (
                    <div 
                      key={product.id}
                      className={cn(
                        "transition-all duration-500",
                        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                      )}
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}