"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, LayoutDashboard, ShoppingBag, Receipt, Settings, Users, LogOut, Menu, X, MonitorCog as MotorbikeCog, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    title: "Transactions",
    href: "/admin/transactions",
    icon: <Receipt className="h-5 w-5" />,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close sidebar on mobile screens
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex flex-col w-64 bg-gray-950 border-r border-gray-800 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        {/* Logo */}
        <div className="flex items-center p-4 h-16 border-b border-gray-800">
          {!['/admin/dashboard', '/admin/products', '/admin/transactions'].includes(pathname ??"") && (
            <Link href="/admin/dashboard" className="flex items-center">
              <MotorbikeCog className={cn(
                "text-red-500 transition-all duration-300",
                isSidebarOpen ? "h-8 w-8 mr-3" : "h-8 w-8"
              )} />
              <span className={cn(
                "font-creepster text-xl text-red-500 transition-all duration-300",
                isSidebarOpen ? "opacity-100" : "opaci/ty-0 w-0 overflow-hidden"
             )}>
              Admin Panel
           </span>
         </Link>
        )}

        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white group transition-all",
                    pathname === item.href && "bg-red-900/20 text-white"
                  )}
                >
                  <span className="text-inherit">{item.icon}</span>
                  <span className={cn(
                    "ml-3 transition-all duration-300 whitespace-nowrap",
                    isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  )}>
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 border border-gray-700">
              <AvatarImage src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              <AvatarFallback className="bg-red-900 text-white">AD</AvatarFallback>
            </Avatar>
            <div className={cn(
              "ml-3 transition-all duration-300",
              isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            )}>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@hauntedparts.com</p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            className={cn(
              "mt-4 text-gray-400 hover:text-white hover:bg-gray-900 w-full justify-start",
              !isSidebarOpen && "justify-center px-0"
            )}
          >
            <LogOut className="h-5 w-5" />
            <span className={cn(
              "ml-2 transition-all duration-300",
              isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            )}>
              Sign Out
            </span>
          </Button>
        </div>
        
        {/* Toggle Button */}
        <button
          className="absolute right-0 top-20 translate-x-1/2 h-8 w-8 rounded-full bg-red-900 text-white flex items-center justify-center border border-red-800 hover:bg-red-800 transition-all duration-300 hidden lg:flex"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-transform duration-300",
            !isSidebarOpen && "transform rotate-180"
          )} />
        </button>
      </aside>

      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-gray-950 border-b border-gray-800 lg:hidden">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <button
              className="text-gray-400 hover:text-white mr-3"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/admin/dashboard" className="flex items-center">
              <MotorbikeCog className="h-8 w-8 text-red-500 mr-2" />
              <span className="font-creepster text-xl text-red-500">Admin Panel</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="relative text-gray-400 hover:text-white">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-600 text-[10px]">
                3
              </Badge>
            </button>
            <Avatar className="h-8 w-8 border border-gray-700">
              <AvatarImage src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              <AvatarFallback className="bg-red-900 text-white">AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black/80 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu */}
      <nav 
        className={cn(
          "fixed top-16 left-0 bottom-0 z-10 w-64 bg-gray-950 border-r border-gray-800 transition-all duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="py-6 px-3 overflow-y-auto h-full">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition-all",
                    pathname === item.href && "bg-red-900/20 text-white"
                  )}
                >
                  <span className="text-inherit">{item.icon}</span>
                  <span className="ml-3">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          <Separator className="my-6 bg-gray-800" />
          
          <div className="px-3">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 border border-gray-700">
                <AvatarImage src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                <AvatarFallback className="bg-red-900 text-white">AD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">admin@hauntedparts.com</p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              className="mt-4 text-gray-400 hover:text-white hover:bg-gray-900 w-full justify-start"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main 
        className={cn(
          "transition-all duration-300 ease-in-out",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20",
          "pt-16 lg:pt-0"
        )}
      >
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>
    </div>
  );
}