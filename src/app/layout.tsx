import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const iransans = localFont({
  src: [
    {
      path: "../../public/fonts/vazir.ttf",
      weight: "400",
      style: "normal",
    },
    
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "حنا بیوتی | مرجع تخصصی محصولات مراقبتی",
  description: "محصولات مراقبت از پوست و زیبایی با عصاره‌های گیاهی",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${iransans.variable} h-full antialiased`}
    >
      <Header />
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
      <Footer />
    </html>
  );
}