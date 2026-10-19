import { Header } from "@/components/layout/Header";
import { ProductsSection } from "@/features/home/components/ProductsSection";
import { IngredientsSection } from "@/features/home/components/IngredientsSection";
import { FaqSection } from "@/features/home/components/FaqSection";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/features/home/components/HeroSection";
import { RoutineSection } from "@/features/home/components/RoutineSection";

export default function HomePage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-[#FDF7F5] text-[#241B1A] antialiased selection:bg-[#F2D6CD]"
    >
      <Header />
      <HeroSection  />
      <ProductsSection />
      <RoutineSection />
      <IngredientsSection />
      <FaqSection />
      <Footer />
      <FloatingRoutineAction />
    </main>
  );
}

function FloatingRoutineAction() {
  return (
    <a
      href="#routine"
      aria-label="ساخت روتین اختصاصی"
      className="fixed bottom-5 start-5 z-40 grid size-14 place-items-center rounded-2xl bg-[#3D2C2A] text-xl text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#513B37] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D9827C]/40"
    >
      ✦
    </a>
  );
}