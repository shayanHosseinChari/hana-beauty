
const FOOTER_LINKS = ["قوانین", "مرجوعی", "پشتیبانی"] as const;
export function Footer() {
  return (
    <footer className="border-t border-[#F0E1DC] bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-xs text-[#6B5350] sm:flex-row sm:px-8">
        <p>© تمامی حقوق برای حنا بیوتی محفوظ است.</p>
        <div className="flex gap-6">
          {FOOTER_LINKS.map((link) => (
            <a key={link} href="#" className="transition hover:text-[#3D2C2A]">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}