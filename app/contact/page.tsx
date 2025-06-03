"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Message sent!",
        description: "We'll respond to your inquiry soon from beyond the grave.",
      });
      
      form.reset();
    }, 1500);
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black relative">
      {/* Spooky background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-red-950/10 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-creepster text-4xl md:text-5xl text-red-600 mb-4">Contact the Spirits</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
          Punya pertanyaan tentang produk terkutuk kami? Butuh dukungan teknis? Tim hantu kami siap membantu Anda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-8 h-full">
              <h2 className="text-2xl font-semibold text-white mb-6">Reach Out to Us</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-900/20 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Our Location</h3>
                    <p className="text-gray-400">
                      666 Nightmare Lane<br />
                      Horror City, HC 13666<br />
                      Free West Papua
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-900/20 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Email Us</h3>
                    <p className="text-gray-400">
                      General Inquiries: <a href="mailto:info@hauntedparts.com" className="text-red-500 hover:underline">info@hauntedparts.com</a><br />
                      Support: <a href="mailto:support@hauntedparts.com" className="text-red-500 hover:underline">support@hauntedparts.com</a><br />
                      Orders: <a href="mailto:orders@hauntedparts.com" className="text-red-500 hover:underline">orders@hauntedparts.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-900/20 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Call Us</h3>
                    <p className="text-gray-400">
                      Main Office: <a href="tel:+16661234567" className="text-red-500 hover:underline">(666) 123-4567</a><br />
                      Technical Support: <a href="tel:+16661234568" className="text-red-500 hover:underline">(666) 123-4568</a><br />
                      Toll-Free: <a href="tel:+18001234567" className="text-red-500 hover:underline">1-800-HAUNTED</a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-white font-medium mb-3">Business Hours</h3>
                <div className="grid grid-cols-2 gap-2 text-gray-400">
                  <div>Monday - Friday:</div>
                  <div>9:00 AM - 6:00 PM</div>
                  <div>Saturday:</div>
                  <div>10:00 AM - 4:00 PM</div>
                  <div>Sunday:</div>
                  <div>Closed</div>
                </div>
                <p className="text-gray-500 mt-4 text-sm">
                  * semua waktu kami siap bermain dengan raungan manja dari sergala betina
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Send a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your name" 
                            className="bg-gray-900 border-gray-800 text-white focus:border-red-900/50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your email" 
                            className="bg-gray-900 border-gray-800 text-white focus:border-red-900/50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="bg-gray-900 border-gray-800 text-white focus:border-red-900/50 min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-red-800 hover:bg-red-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-8 border-t border-gray-800 pt-6">
                <p className="text-gray-400 text-sm">
                  Dengan mengirimkan formulir ini, Anda menyetujui  <a href="#" className="text-red-500 hover:underline">Privacy Policy</a> dan setuju untuk dihubungi mengenai pertanyaan Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-hidden">
            <div className="relative h-[400px] w-full">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url('https://images.pexels.com/photos/4709496/pexels-photo-4709496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
                  filter: "grayscale(1) brightness(0.6) contrast(1.2)"
                }}
              />
              <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay"></div>
              
              {/* Map pin */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 bg-red-800 rounded-full"></div>
                </div>
                <div className="w-2 h-6 bg-red-600 absolute left-1/2 transform -translate-x-1/2 top-full after:content-[''] after:w-6 after:h-6 after:bg-red-600 after:absolute after:bottom-full after:left-1/2 after:transform after:-translate-x-1/2 after:rotate-45 after:z-[-1]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}