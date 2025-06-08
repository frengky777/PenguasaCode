'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  MonitorCog as MotorbikeCog,
} from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "", rememberMe: false },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (values.username === "admin123" && values.password === "12345") {
        toast({ title: "Login successful", description: "Welcome back, Administrator" });
        router.push("/admin/dashboard");
      } else if (values.username === "user123" && values.password === "12345") {
        toast({ title: "Login successful", description: "Welcome back to Haunted Parts" });
        router.push("/");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
    }, 1500);
  }

  function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({ title: "Registration successful", description: "You can now login." });
      registerForm.reset();
    }, 1500);
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] opacity-10"></div>
      <div className="container relative z-10">
        <div className="max-w-md mx-auto">
          <Card className="bg-black/80 backdrop-blur-sm shadow-lg border border-gray-800">
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-red-900/20 flex items-center justify-center">
                  <MotorbikeCog className="h-8 w-8 text-red-500" />
                </div>
              </div>
              <CardTitle className="text-3xl text-red-600">Haunted Parts</CardTitle>
              <CardDescription className="text-gray-400">
                Login or create a new account
              </CardDescription>
            </CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-red-800" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </TabsContent>
              <TabsContent value="register">
                <CardContent>
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                     <FormField
  control={registerForm.control}
  name="terms"
  render={({ field }) => (
    <FormItem className="flex items-start space-x-2 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
          className="border-gray-700 data-[state=checked]:bg-red-800 data-[state=checked]:border-red-800 mt-1"
        />
      </FormControl>
      <FormLabel className="text-gray-400 text-sm">
        I agree to the <a href="#" className="text-red-500 hover:underline">Terms of Service</a> and <a href="#" className="text-red-500 hover:underline">Privacy Policy</a>
      </FormLabel>
      <FormMessage />
    </FormItem>
  )}
/>
                      <Button type="submit" className="w-full bg-red-800" disabled={isSubmitting}>
                        {isSubmitting ? "Registering..." : "Register"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
