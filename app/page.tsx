import { Button } from "@/components/ui/button";
import { BestSellers } from "@/components/home/BestSellers";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
export default function Home() {
  return (
    <div className="relative">
      {/* Floating cobweb decorations */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-[url('https://images.pexels.com/photos/7794442/pexels-photo-7794442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] opacity-20 bg-contain bg-no-repeat pointer-events-none" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-[url('https://images.pexels.com/photos/7794442/pexels-photo-7794442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] opacity-20 bg-contain bg-no-repeat transform scale-x-[-1] pointer-events-none" />

      {/* Hero Section */}
      <HeroSection />

      {/* Best Sellers Section */}
      <BestSellers />

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
      
      {/* Button */}
      <Button/>

      {/* Floating blood splatter decoration */}
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[url('https://images.pexels.com/photos/3640403/pexels-photo-3640403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] opacity-10 bg-contain bg-no-repeat pointer-events-none" />
    </div>
  );
}