import './globals.css';
import type { Metadata } from 'next';
import { Inter, Creepster } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const creepster = Creepster({ 
  weight: '400', 
  subsets: ['latin'],
  variable: '--font-creepster',
});

export const metadata: Metadata = {
  title: 'Haunted Parts - Horror Themed Motorcycle Parts',
  description: 'Find the most terrifying motorcycle spare parts for your ride',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${creepster.variable} font-sans bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}