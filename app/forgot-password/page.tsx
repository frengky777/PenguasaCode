"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
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
import Link from "next/link";
import { ArrowLeft, Mail, MonitorCog as MotorbikeCog } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate sending reset email
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Reset email sent",
        description: `Instructions to reset your password have been sent to ${values.email}`,
      });
    }, 1500);
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black relative flex items-center justify-center">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-red-950/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
        
        {/* Red fog at corners */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <Card className="border-gray-800 bg-black/80 backdrop-blur-sm shadow-xl shadow-red-900/5">
            <CardHeader className="text-center border-b border-gray-800 pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center">
                  <MotorbikeCog className="h-8 w-8 text-red-500" />
                </div>
              </div>
              <CardTitle className="font-creepster text-3xl text-red-600">Forgot Password</CardTitle>
              <CardDescription className="text-gray-400">
                Enter your email to receive password reset instructions
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              {isSuccess ? (
                <div className="text-center py-6">
                  <div className="mx-auto w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">Check Your Email</h3>
                  <p className="text-gray-400 mb-6">
                    We've sent recovery instructions to your email. Please check your inbox and follow the link to reset your password.
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                  <Button 
                    className="bg-red-800 hover:bg-red-700 text-white w-full"
                    onClick={() => {
                      setIsSuccess(false);
                      form.reset();
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="Enter your email" 
                              className="bg-gray-900/50 border-gray-800 text-white"
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
                          <Mail className="mr-2 h-4 w-4" />
                          Send Reset Instructions
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
            
            <CardFooter className="border-t border-gray-800 flex justify-center py-4">
              <Button variant="ghost" asChild className="text-gray-400 hover:text-white">
                <Link href="/login" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}