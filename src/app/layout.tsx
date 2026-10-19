import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const iransans = localFont({
  src: [
    {
      path: "./fonts/IranianSans.ttf",
      weight: "400",
      style: "normal",
    },
    
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "لونِیا | زیبایی طبیعی",
  description: "محصولات مراقبت از پوست و زیبایی با عصاره‌های گیاهی",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${iransans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}