"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MonitorCog as MotorbikeCog, AlignJustify, X, Search, ShoppingCart, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if link is active
  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-black/90 shadow-lg shadow-red-900/20 backdrop-blur-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
  <MotorbikeCog className="h-8 w-8 text-red-500" />
</Link>

          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "text-lg font-medium hover:text-red-500 transition-colors relative group",
                  isActive(link.path) ? "text-red-500" : "text-white"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300",
                  isActive(link.path) ? "w-full" : "group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>
          
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-white hover:text-red-500 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-white hover:text-red-500 transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <Link href="/login">
              <Button variant="ghost" className="hover:text-red-500 hover:bg-black/20">
                <UserCircle className="h-5 w-5 mr-2" />
                Login
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-red-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <AlignJustify className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-black/95 backdrop-blur-sm z-40 md:hidden transition-transform duration-300 flex flex-col pt-24",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col items-center gap-6 mt-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-xl font-medium hover:text-red-500 transition-colors",
                isActive(link.path) ? "text-red-500" : "text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px w-24 bg-red-800/40 my-4" />
          <Link 
            href="/login" 
            onClick={() => setIsMenuOpen(false)}
            className="text-xl text-white hover:text-red-500 transition-colors"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;