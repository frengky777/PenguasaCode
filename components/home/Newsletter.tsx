"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Skull } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    // Simulate subscription
    toast({
      title: "Successfully subscribed!",
      description: "Prepare for terrifying updates from beyond the grave.",
      variant: "default",
    });
    
    setEmail("");
  };

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3396668/pexels-photo-3396668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-5"></div>
      </div>
      
      {/* Red glow effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-800/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <h2 className="font-creepster text-4xl text-red-600 mb-3">
            Subscribe to Our Cursed Newsletter
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
             Bergabunglah dengan kelompok pengendara kami dan jadilah orang pertama yang mengetahui tentang pendatang baru, penawaran eksklusif, dan diskon yang menggiurkan. </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email..."
              className="border-gray-800 bg-gray-900/50 focus:border-red-900/50 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="bg-red-700 hover:bg-red-800 text-white">
              Subscribe
              <Skull className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <p className="text-gray-500 text-sm mt-4">
          Dengan berlangganan, Anda setuju untuk menerima email pemasaran dan bergabung dengan lingkaran ritual kami. Berhenti berlangganan kapan saja.          </p>
        </div>
      </div>
    </section>
  );
};