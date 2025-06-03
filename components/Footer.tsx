import Link from "next/link";
import { MonitorCog as MotorbikeCog, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 border-t border-red-900/30">
      {/* Top decorative border */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <MotorbikeCog className="h-8 w-8 text-red-500" />
              <span className="font-creepster text-2xl tracking-wider text-red-500">Haunted Parts</span>
            </Link>
            <p className="text-sm text-gray-400">
              Memberikan mimpi buruk pada sepeda motor Anda sejak 2020. Suku cadang berkualitas dengan sentuhan horor.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Shop", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-red-500 transition-colors group flex items-center"
                  >
                    <span className="opacity-0 group-hover:opacity-100 mr-1 transition-opacity">›</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Categories</h3>
            <ul className="space-y-2">
              {["Engine Parts", "Suspension", "Brakes", "Exhaust Systems", "Lighting"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/shop?category=${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-gray-400 hover:text-red-500 transition-colors group flex items-center"
                  >
                    <span className="opacity-0 group-hover:opacity-100 mr-1 transition-opacity">›</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <span className="text-gray-400">666 Nightmare Lane, Horror City, HC 13666</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-gray-400">(666) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-gray-400">contact@hauntedparts.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Haunted Parts. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4 text-sm text-gray-500">
              <li>
                <Link href="/terms" className="hover:text-red-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-red-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;