"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ChevronRight, Users, Award, Wrench, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black relative">
      {/* Spooky background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-red-950/10 to-transparent"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-black">
          <div 
            className="absolute inset-0 bg-[url('https://images.pexels.com/photos/10443212/pexels-photo-10443212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center"
            style={{ 
              opacity: 0.3,
              filter: "brightness(0.4) contrast(1.2)"
            }}
          />
          {/* Fog overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 
              className={cn(
                "font-creepster text-5xl text-red-600 mb-6 transition-all duration-1000",
                loaded ? "translate-x-0 opacity-100" : "translate-x-[-100px] opacity-0"
              )}
            >
              Tentang Toko Berhantu Kami
            </h1>
            <p 
              className={cn(
                "text-xl text-gray-300 mb-8 transition-all duration-1000 delay-300",
                loaded ? "translate-x-0 opacity-100" : "translate-x-[-100px] opacity-0"
              )}
            >
              Didirikan pada tengah malam di bawah bulan darah, Haunted Parts muncul dari hasrat terhadap sepeda motor dan hal-hal mengerikan. Misi kami adalah menyediakan suku cadang berkualitas yang mengubah perjalanan biasa menjadi mimpi buruk yang legendaris.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div 
              className={cn(
                "relative rounded-lg overflow-hidden h-[400px] transition-all duration-1000",
                loaded ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"
              )}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url('https://images.pexels.com/photos/16556354/pexels-photo-16556354/free-photo-of-motorcycle-in-workshop.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
                  filter: "brightness(0.8) contrast(1.1)"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
              
              {/* Red film grain overlay */}
              <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay"></div>
            </div>
            
            <div 
              className={cn(
                "transition-all duration-1000 delay-200",
                loaded ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"
              )}
            >
              <h2 className="font-creepster text-4xl text-red-600 mb-6">Our Cursed Story</h2>
              <p className="text-gray-300 mb-4">
              Kami Semuanya berawal di bengkel yang terlupakan di pinggir kota, tempat pendiri kami menemukan bahwa suku cadang yang diresapi dengan esensi yang menakutkan bekerja di luar ekspektasi manusia. Apa yang dimulai sebagai eksperimen gelap telah berkembang menjadi tujuan utama bagi pengendara yang mencari suku cadang yang secara teknis lebih unggul dan secara estetika lebih keren.
              </p>
              <p className="text-gray-300 mb-6">
              Sejak 2020, tim hantu mekanis kami telah membuat komponen yang menghidupkan mimpi buruk. Setiap produk dalam katalog kami diproduksi dalam kondisi atmosfer tertentu untuk memastikan bahwa produk tersebut memiliki keseimbangan sempurna antara keunggulan fungsional dan karakter supernatural.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-600 mr-2"></div>
                  <span className="text-gray-400">Founded 2020</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-600 mr-2"></div>
                  <span className="text-gray-400">300+ Products</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-600 mr-2"></div>
                  <span className="text-gray-400">5000+ Customers</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-600 mr-2"></div>
                  <span className="text-gray-400">Nationwide Delivery</span>
                </div>
              </div>
              
              <Button asChild className="bg-red-900 hover:bg-red-800 text-white">
                <Link href="/contact">
                  Contact Us
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-950 relative">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7794442/pexels-photo-7794442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-repeat opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-creepster text-4xl text-red-600 mb-3">Our Haunting Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The dark principles that guide our workshop and ensure every product delivers both terror and quality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="h-10 w-10 text-red-500" />,
                title: "Unholy Quality",
                description: "Kami mengambil material terbaik dan memasukkan energi gelap ke dalamnya untuk menciptakan komponen yang bertahan lebih lama dari kompetitor."
              },
              {
                icon: <Users className="h-10 w-10 text-red-500" />,
                title: "Spectral Service",
                description: "Tim layanan pelanggan kami siap sedia siang dan malam untuk menjawab pertanyaan dan menyelesaikan masalah dengan efisiensi luar biasa."
              },
              {
                icon: <Wrench className="h-10 w-10 text-red-500" />,
                title: "Demonic Innovation",
                description: "Kami terus menerus mendorong batasan hal yang mungkin, mengembangkan produk baru yang menantang rekayasa sepeda motor konvensional."
              },
              {
                icon: <BookOpen className="h-10 w-10 text-red-500" />,
                title: "Dark Knowledge",
                description: "Tim kami berbagi wawasan teknis dan panduan instalasi untuk memastikan komponen terkutuk Anda berfungsi sebagaimana mestinya."
              }
            ].map((value, index) => (
              <Card 
                key={index} 
                className={cn(
                  "bg-black/50 backdrop-blur border-gray-800 hover:border-red-900/50 transition-all duration-500",
                  loaded ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-creepster text-4xl text-red-600 mb-3">Our Ghostly Team</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Temui hantu di balik Haunted Parts, masing-masing membawa pengalaman bertahun-tahun dari balik tabir
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: " Destin Graves",
                role: "Founder & Head Engineer",
                bio: "After 15 years working with major motorcycle manufacturers, Victor established Haunted Parts to pursue his vision of otherworldly performance parts.",
                image: "/image/des.jpg"
              },
              {
                name: "Sastra Shadowrider",
                role: "Product Development",
                bio: "Lilith brought her racing experience and engineering background to create products that perform as terrifyingly well on the track as they do on the street.",
                image: "/image/bli.jpg"
              },
              {
                name: "Frengky Nightshade",
                role: "Quality Assurance",
                bio: "With a meticulous eye for detail and a background in metallurgy, Damien ensures every part meets our strict standards before it leaves our haunted workshop.",
                image: "/image/engky.jpg"
              },
              {
                name: "Mukta Graves",
                role: "Founder & Head Engineer",
                bio: "After 15 years working with major motorcycle manufacturers, Victor established Haunted Parts to pursue his vision of otherworldly performance parts.",
                image: "/image/ogy.jpg"
              }
            ].map((member, index) => (
              <div 
                key={index} 
                className={cn(
                  "group relative rounded-lg overflow-hidden border border-gray-800 bg-gray-950 h-[400px] transition-all duration-500",
                  "hover:border-red-900/50 hover:shadow-lg hover:shadow-red-900/10",
                  loaded ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                  style={{ 
                    backgroundImage: `url(${member.image})`,
                    filter: "brightness(0.7) contrast(1.1)"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-red-500 mb-3 font-medium">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-gray-950 to-black relative">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4571219/pexels-photo-4571219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-repeat-x bg-top opacity-10 rotate-180"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-creepster text-4xl text-red-600 mb-6">
              Siap Mengubah Kendaraan Anda?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Jelajahi koleksi suku cadang sepeda motor terkutuk kami dan lepaskan potensi sepeda motor Anda yang sesungguhnya. Setiap produk memiliki jaminan kualitas dan kinerja yang luar biasa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-700 hover:bg-red-800 text-white border border-red-600/50">
                <Link href="/shop">
                  Shop Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-red-700/30 text-white hover:bg-red-950/30">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}