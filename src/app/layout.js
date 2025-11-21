import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./Components/Footer"; // Import the Footer component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jain Dairy - Pure & Fresh Dairy Products",
  description: "Experience the journey of pure dairy products from farm to your home. Jain Dairy - Serving since 1988 with quality and tradition.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* Main content area that grows to fill space */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* Footer at the bottom */}
        <Footer />
      </body>
    </html>
  );
}