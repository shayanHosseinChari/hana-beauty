"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./home.module.css";


type Category = "all" | "cream" | "serum" | "hair" | "makeup";

type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "all">;
  price: number;
  oldPrice?: number;
  rating: number;
  art: "bottle" | "jar" | "tube" | "pump";
  artColor: "olive" | "cream" | "rose" | "forest";
  label: string;
};

type CartLine = { id: number; qty: number };

type InfoKind = "about" | "blog" | "support" | null;


const PRODUCTS: Product[] = [
  { id: 1, name: "سرم روشن‌کننده ویتامین C", category: "serum", price: 890000, oldPrice: 1150000, rating: 4.8, art: "bottle", artColor: "olive", label: "Lunéa" },
  { id: 2, name: "کرم مرطوب‌کننده شب", category: "cream", price: 720000, rating: 4.6, art: "jar", artColor: "cream", label: "Night" },
  { id: 3, name: "شامپو تقویت‌کننده مو", category: "hair", price: 430000, rating: 4.4, art: "pump", artColor: "forest", label: "Hair" },
  { id: 4, name: "رژ لب طبیعی گل محمدی", category: "makeup", price: 310000, oldPrice: 390000, rating: 4.9, art: "tube", artColor: "rose", label: "Rose" },
  { id: 5, name: "سرم آبرسان هیالورونیک", category: "serum", price: 960000, rating: 4.7, art: "bottle", artColor: "forest", label: "Hydra" },
  { id: 6, name: "کرم ضدآفتاب SPF50", category: "cream", price: 540000, oldPrice: 640000, rating: 4.5, art: "tube", artColor: "cream", label: "SPF50" },
  { id: 7, name: "ماسک موی آرگان", category: "hair", price: 380000, rating: 4.3, art: "jar", artColor: "olive", label: "Argan" },
  { id: 8, name: "پالت سایه چشم خاکی", category: "makeup", price: 620000, rating: 4.6, art: "jar", artColor: "rose", label: "Earth" },
];

const CATEGORIES: { key: Category; label: string; emoji: string }[] = [
  { key: "cream", label: "کرم صورت", emoji: "🧴" },
  { key: "serum", label: "سرم پوست", emoji: "💧" },
  { key: "hair", label: "محصولات مو", emoji: "🌿" },
  { key: "makeup", label: "آرایش", emoji: "💄" },
];

const faNum = (n: number) => n.toLocaleString("fa-IR");

/* ------------------------------------------------------------------ */
/* Inline SVG icon component (typed safely, no dependencies)           */
/* ------------------------------------------------------------------ */

type IconName =
  | "leaf" | "search" | "cart" | "heart" | "heartFilled" | "home"
  | "tag" | "star" | "plus" | "minus" | "close" | "menu" | "arrow"
  | "truck" | "shield" | "clock" | "sparkle";

function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
  const paths: Record<IconName, React.ReactNode> = {
    leaf: <path d="M4 20C4 12 9 5 20 4c0 11-7 16-15 16M4 20c2-5 5-8 10-10" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    cart: <><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2l2.4 11h10.2L20 7H6" /></>,
    heart: <path d="M12 20s-7-4.4-9-9c-1.2-2.8.6-6 3.8-6C9 5 11 7 12 8.3 13 7 15 5 17.2 5c3.2 0 5 3.2 3.8 6-2 4.6-9 9-9 9Z" />,
    heartFilled: <path d="M12 20s-7-4.4-9-9c-1.2-2.8.6-6 3.8-6C9 5 11 7 12 8.3 13 7 15 5 17.2 5c3.2 0 5 3.2 3.8 6-2 4.6-9 9-9 9Z" fill="currentColor" />,
    home: <><path d="M4 10.5 12 4l8 6.5V20h-5v-5h-6v5H4Z" /></>,
    tag: <><path d="M3 12 12 3h9v9l-9 9-9-9Z" /><circle cx="16.5" cy="7.5" r="1.3" /></>,
    star: <path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.6l1.1-6L3.4 9.4l6-.8Z" fill="currentColor" stroke="none" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    arrow: <path d="M19 12H5m6-6-6 6 6 6" />,
    truck: <><path d="M2 7h11v9H2zM13 10h4l3 3v3h-7z" /><circle cx="6" cy="18" r="1.5" /><circle cx="16.5" cy="18" r="1.5" /></>,
    shield: <path d="M12 3l7 3v5c0 5-3.4 8.3-7 10-3.6-1.7-7-5-7-10V6Z" />,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></>,
    sparkle: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

/* ------------------------------------------------------------------ */
/* CSS product illustration (no external images)                      */
/* ------------------------------------------------------------------ */

function ProductArt({ product }: { product: Product }) {
  const { art, artColor, label } = product;
  return (
    <div className={`${styles.artStage} ${styles[`art_${artColor}`]}`}>
      {art === "bottle" && (
        <div className={styles.artBottle}>
          <span className={styles.artDropper} />
          <span className={styles.artBottleBody}>
            <span className={styles.artLabel}>{label}</span>
          </span>
        </div>
      )}
      {art === "jar" && (
        <div className={styles.artJar}>
          <span className={styles.artJarLid} />
          <span className={styles.artJarBody}>
            <span className={styles.artLabel}>{label}</span>
          </span>
        </div>
      )}
      {art === "tube" && (
        <div className={styles.artTube}>
          <span className={styles.artTubeCap} />
          <span className={styles.artTubeBody}>
            <span className={styles.artLabel}>{label}</span>
          </span>
        </div>
      )}
      {art === "pump" && (
        <div className={styles.artPump}>
          <span className={styles.artPumpNozzle} />
          <span className={styles.artPumpNeck} />
          <span className={styles.artPumpBody}>
            <span className={styles.artLabel}>{label}</span>
          </span>
        </div>
      )}
      <span className={styles.artShadow} aria-hidden />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modal with focus trap + restoration                                */
/* ------------------------------------------------------------------ */

const INFO_CONTENT: Record<"about" | "blog" | "support", { title: string; body: string[] }> = {
  about: {
    title: "درباره لونِیا",
    body: [
      "لونِیا برند ایرانی محصولات مراقبت از پوست و زیبایی است که با تکیه بر عصاره‌های گیاهی طبیعت ایران ساخته می‌شود.",
      "فرمولاسیون ما بدون پارابن و بدون تست حیوانی است و همه محصولات پیش از عرضه، آزمون‌های پوستی مستقل را می‌گذرانند.",
    ],
  },
  blog: {
    title: "بلاگ لونِیا",
    body: [
      "مقاله‌های ما درباره روتین پوستی، انتخاب ضدآفتاب مناسب، خواص عصاره‌های گیاهی و مراقبت مو منتشر می‌شود.",
      "به‌زودی بخش کامل مقالات در همین مسیر فعال خواهد شد؛ در این نسخه نمایشی فقط معرفی محتواست.",
    ],
  },
  support: {
    title: "پشتیبانی",
    body: [
      "پاسخ‌گویی تلفنی هر روز از ۹ صبح تا ۹ شب و پشتیبانی چت ۲۴ ساعته است.",
      "برای پیگیری سفارش‌ها و مشاوره رایگان پوست، از بخش تماس استفاده کنید. این نسخه نمایشی، ثبت تیکت واقعی ندارد.",
    ],
  },
};

function InfoModal({
  kind,
  onClose,
}: {
  kind: Exclude<InfoKind, null>;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>("button, [href]");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "Tab" && panel) {
        const items = Array.from(
          panel.querySelectorAll<HTMLElement>("button, [href]")
        );
        if (items.length === 0) return;
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      restoreRef.current?.focus();
    };
  }, [onClose]);

  const info = INFO_CONTENT[kind];
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
        className={styles.modalPanel}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHead}>
          <h2 id="info-modal-title">{info.title}</h2>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="بستن"
            onClick={onClose}
          >
            <Icon name="close" />
          </button>
        </div>
        {info.body.map((p, i) => (
          <p key={i} className={styles.modalBody}>
            {p}
          </p>
        ))}
        <button
          type="button"
          className={styles.btnTerracotta}
          onClick={onClose}
        >
          متوجه شدم
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cart drawer                                                        */
/* ------------------------------------------------------------------ */

function CartDrawer({
  open,
  lines,
  onClose,
  onQty,
  onRemove,
}: {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>("button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      restoreRef.current?.focus();
    };
  }, [open, onClose]);

  const total = lines.reduce((sum, l) => {
    const p = PRODUCTS.find((x) => x.id === l.id);
    return sum + (p ? p.price * l.qty : 0);
  }, 0);

  return (
    <div
      className={open ? styles.drawerOverlayOpen : styles.drawerOverlay}
      onClick={onClose}
      aria-hidden={!open}
    >
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید"
        className={open ? styles.drawerOpen : styles.drawer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.drawerHead}>
          <h2>سبد خرید</h2>
          <button type="button" className={styles.iconBtn} aria-label="بستن سبد خرید" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className={styles.drawerEmpty}>
            <Icon name="cart" size={44} />
            <p>سبد خرید شما خالی است.</p>
            <button type="button" className={styles.btnTerracotta} onClick={onClose}>
              شروع خرید
            </button>
          </div>
        ) : (
          <>
            <ul className={styles.drawerList}>
              {lines.map((l) => {
                const p = PRODUCTS.find((x) => x.id === l.id);
                if (!p) return null;
                return (
                  <li key={l.id} className={styles.drawerItem}>
                    <ProductArt product={p} />
                    <div className={styles.drawerItemInfo}>
                      <span className={styles.drawerItemName}>{p.name}</span>
                      <span className={styles.drawerItemPrice}>
                        {faNum(p.price)} تومان
                      </span>
                      <div className={styles.qtyRow}>
                        <button type="button" className={styles.qtyBtn} aria-label={`افزودن تعداد ${p.name}`} onClick={() => onQty(l.id, 1)}>
                          <Icon name="plus" size={14} />
                        </button>
                        <span aria-live="polite">{faNum(l.qty)}</span>
                        <button type="button" className={styles.qtyBtn} aria-label={`کاهش تعداد ${p.name}`} onClick={() => onQty(l.id, -1)}>
                          <Icon name="minus" size={14} />
                        </button>
                        <button type="button" className={styles.removeBtn} onClick={() => onRemove(l.id)}>
                          حذف
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={styles.drawerFoot}>
              <div className={styles.drawerTotal}>
                <span>مجموع:</span>
                <strong>{faNum(total)} تومان</strong>
              </div>
              <p className={styles.demoNote}>
                این نسخه نمایشی است؛ فرایند پرداخت فعال نیست.
              </p>
              <button
                type="button"
                className={styles.btnTerracotta}
                disabled
                aria-disabled="true"
                title="نمایشی — فعال نیست"
              >
                تکمیل خرید (نمایشی)
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favFilter, setFavFilter] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [info, setInfo] = useState<InfoKind>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");
  const [toast, setToast] = useState<string>("");
  const productsRef = useRef<HTMLDivElement>(null);

  const addToCart = useCallback((id: number, name: string) => {
    setCart((c) => {
      const found = c.find((l) => l.id === id);
      if (found) return c.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...c, { id, qty: 1 }];
    });
    setToast(`«${name}» به سبد خرید اضافه شد`);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenu(false);
    };
    if (mobileMenu) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileMenu]);

  const toggleFav = (id: number) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const visible = useMemo(() => {
    const q = query.trim();
    return PRODUCTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (onlyDiscount && p.oldPrice === undefined) return false;
      if (favFilter && !favorites.includes(p.id)) return false;
      if (q && !p.name.includes(q) && !p.label.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
  }, [query, category, onlyDiscount, favFilter, favorites]);

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);

  const scrollToProducts = () =>
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const navActions = {
    onAbout: () => setInfo("about"),
    onBlog: () => setInfo("blog"),
    onSupport: () => setInfo("support"),
    onProducts: scrollToProducts,
    onHome: () => window.scrollTo({ top: 0, behavior: "smooth" }),
  };

  const navLinks: { label: string; action: () => void }[] = [
    { label: "خانه", action: navActions.onHome },
    { label: "محصولات", action: navActions.onProducts },
    { label: "درباره ما", action: navActions.onAbout },
    { label: "بلاگ", action: navActions.onBlog },
    { label: "پشتیبانی", action: navActions.onSupport },
  ];

  return (
    <div className={styles.frame} dir="ltr">
      {/* mobile menu overlay */}
      {mobileMenu && (
        <div className={styles.mobileMenu} onClick={() => setMobileMenu(false)}>
          <nav aria-label="منوی موبایل" onClick={(e) => e.stopPropagation()} className={styles.mobileMenuPanel}>
            {navLinks.map((l) => (
              <button key={l.label} type="button" className={styles.mobileNavLink}
                onClick={() => { l.action(); setMobileMenu(false); }}>
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* ---------- Header (above sidebar z-wise, sidebar stays LEFT) ---------- */}
      <header className={styles.header} dir="rtl">
        <div className={styles.headerRight}>
          <button type="button" className={`${styles.iconBtn} ${styles.burgerOnly}`}
            aria-label="باز کردن منو" aria-expanded={mobileMenu}
            onClick={() => setMobileMenu(true)}>
            <Icon name="menu" />
          </button>
          <span className={styles.brand} aria-label="لونِیا — زیبایی طبیعی">
            <Icon name="leaf" className={styles.brandLeaf} />
            <span className={styles.brandName}>Lunéa</span>
            <span className={styles.brandSub}>Natural Beauty</span>
          </span>
        </div>

        <form
          className={styles.searchForm}
          role="search"
          onSubmit={(e) => { e.preventDefault(); scrollToProducts(); }}
        >
          <label className={styles.srOnly} htmlFor="site-search">جستجوی محصولات</label>
          <Icon name="search" size={17} className={styles.searchIcon} />
          <input
            id="site-search"
            className={styles.searchInput}
            type="search"
            placeholder="جستجوی محصولات..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className={styles.headerLeft}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-pressed={favFilter}
            aria-label={favFilter ? "نمایش همه محصولات" : "نمایش علاقه‌مندی‌ها"}
            onClick={() => { setFavFilter((v) => !v); scrollToProducts(); }}
          >
            <Icon name={favFilter ? "heartFilled" : "heart"} />
          </button>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.cartBtn}`}
            aria-label={`سبد خرید، ${faNum(cartCount)} قلم`}
            onClick={() => setCartOpen(true)}
          >
            <Icon name="cart" />
            {cartCount > 0 && <span className={styles.badge}>{faNum(cartCount)}</span>}
          </button>
        </div>
      </header>

      {/* ---------- LEFT sidebar (desktop) ---------- */}
      <aside className={styles.sidebar} dir="rtl" aria-label="منوی کناری">
        <div className={styles.sidePromo}>
          <span className={styles.sidePromoArt} aria-hidden>
            <span className={styles.sidePromoBottle} />
          </span>
          <div>
            <strong>روتین مراقبت پوست</strong>
            <p>۳ مرحله ساده برای پوستی درخشان</p>
          </div>
          <button type="button" className={styles.sidePromoBtn} aria-label="مشاهده محصولات مراقبت پوست" onClick={scrollToProducts}>
            <Icon name="arrow" size={16} />
          </button>
        </div>

        <nav className={styles.sideNav} aria-label="ناوبری کناری">
          <button type="button" className={styles.sideLink} onClick={navActions.onHome}>
            <Icon name="home" size={18} /> خانه
          </button>
          <button type="button" className={styles.sideLink} onClick={navActions.onProducts}>
            <Icon name="sparkle" size={18} /> محصولات
          </button>
          <button
            type="button"
            className={`${styles.sideLink} ${onlyDiscount ? styles.sideLinkActive : ""}`}
            aria-pressed={onlyDiscount}
            onClick={() => { setOnlyDiscount((v) => !v); scrollToProducts(); }}
          >
            <Icon name="tag" size={18} /> تخفیف‌ها
          </button>
          <button
            type="button"
            className={`${styles.sideLink} ${favFilter ? styles.sideLinkActive : ""}`}
            aria-pressed={favFilter}
            onClick={() => { setFavFilter((v) => !v); scrollToProducts(); }}
          >
            <Icon name="heart" size={18} /> علاقه‌مندی‌ها
            {favorites.length > 0 && <span className={styles.sideCount}>{faNum(favorites.length)}</span>}
          </button>
          <button type="button" className={styles.sideLink} onClick={navActions.onSupport}>
            <Icon name="shield" size={18} /> پشتیبانی
          </button>
        </nav>

        <div className={styles.sideFooter}>
          <span className={styles.sideLeafRow} aria-hidden>
            <Icon name="leaf" size={14} />
            <Icon name="leaf" size={18} />
            <Icon name="leaf" size={12} />
          </span>
          <p>زیبایی طبیعی<br />از دل طبیعت</p>
        </div>
      </aside>

      {/* ---------- Main (RTL content) ---------- */}
      <main className={styles.main} dir="rtl">
        {/* Hero */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroText}>
            <h1 id="hero-title" className={styles.heroTitle}>
              طبیعت، بهترین زیبایی را می‌سازد
            </h1>
            <p className={styles.heroDesc}>
              محصولات مراقبت از پوست لونِیا با عصاره‌های گیاهی خالص و فرمولاسیون
              ملایم، درخشش طبیعی پوست شما را به ارمغان می‌آورند؛ بدون مواد
              شیمیایی آسیب‌زا و بدون تست حیوانی.
            </p>
            <div className={styles.heroActions}>
              <button type="button" className={styles.btnTerracotta} onClick={scrollToProducts}>
                مشاهده محصولات
                <Icon name="arrow" size={16} className={styles.btnArrow} />
              </button>
              <button type="button" className={styles.btnGhost} onClick={() => setInfo("about")}>
                درباره لونِیا
              </button>
            </div>
            <div className={styles.heroRating}>
              <span className={styles.stars} aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon key={i} name="star" size={14} />
                ))}
              </span>
              <span>۴٫۸ از ۵ — رضایت بیش از ۱۲ هزار مشتری</span>
            </div>
          </div>

          <div className={styles.heroMedia}>
            <div className={styles.heroBlob}>
              <Image
                src="/images/lunea-hero.webp"
                alt="مدل با پوستی درخشان و سرم پوستی لونِیا روی سنگ‌ها میان گل‌های سفید"
                width={900}
                height={900}
                priority
                sizes="(max-width: 768px) 90vw, 480px"
                className={styles.heroImg}
              />
            </div>
            <div className={styles.heroBadge} aria-hidden>
              <span className={styles.heroBadgeTitle}>Skin Renewal Serum</span>
              <span className={styles.stars}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon key={i} name="star" size={12} />
                ))}
              </span>
              <span className={styles.heroBadgeScore}>۴٫۸</span>
            </div>
          </div>
        </section>

        {/* Category cards (right-aligned row) + moisturizer promo (left) */}
        <section className={styles.midRow} aria-label="دسته‌بندی‌ها و پیشنهاد ویژه">
          <div className={styles.catWrap}>
            <h2 className={styles.sectionTitle}>محبوب‌ترین محصولات</h2>
            <div className={styles.catRow}>
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  className={`${styles.catCard} ${category === c.key ? styles.catCardActive : ""}`}
                  aria-pressed={category === c.key}
                  onClick={() => { setCategory(c.key); scrollToProducts(); }}
                >
                  <span className={styles.catEmoji} aria-hidden>{c.emoji}</span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.moistPromo}>
            <div className={styles.moistArt} aria-hidden>
              <span className={styles.moistJar}>
                <span className={styles.moistCream} />
              </span>
            </div>
            <div className={styles.moistText}>
              <h3>کرم‌های مرطوب‌کننده</h3>
              <p>آبرسانی ۲۴ ساعته با بافت سبک و جذب سریع</p>
              <button type="button" className={styles.moistBtn} onClick={() => { setCategory("cream"); scrollToProducts(); }}>
                مشاهده
                <Icon name="arrow" size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className={styles.benefits} aria-label="مزایای خرید از لونِیا">
          <div className={styles.benefit}>
            <Icon name="truck" />
            <div><strong>ارسال سریع</strong><span>تحویل ۲ تا ۳ روز کاری</span></div>
          </div>
          <div className={styles.benefit}>
            <Icon name="shield" />
            <div><strong>ضمانت اصالت</strong><span>۱۰۰٪ اورجینال و اصولی</span></div>
          </div>
          <div className={styles.benefit}>
            <Icon name="clock" />
            <div><strong>پشتیبانی ۲۴/۷</strong><span>همیشه کنار شما هستیم</span></div>
          </div>
        </section>

        {/* Products */}
        <section ref={productsRef} className={styles.productsSection} aria-labelledby="products-title">
          <div className={styles.productsHead}>
            <h2 id="products-title" className={styles.sectionTitle}>همه محصولات</h2>
            <div className={styles.productsFilters}>
              <div className={styles.chipRow} role="group" aria-label="فیلتر دسته‌بندی">
                <button type="button" className={`${styles.chip} ${category === "all" ? styles.chipActive : ""}`}
                  aria-pressed={category === "all"} onClick={() => setCategory("all")}>
                  همه
                </button>
                {CATEGORIES.map((c) => (
                  <button key={c.key} type="button"
                    className={`${styles.chip} ${category === c.key ? styles.chipActive : ""}`}
                    aria-pressed={category === c.key}
                    onClick={() => setCategory(c.key)}>
                    {c.label}
                  </button>
                ))}
              </div>
              <label className={styles.switchRow}>
                <input type="checkbox" checked={onlyDiscount}
                  onChange={(e) => setOnlyDiscount(e.target.checked)} />
                فقط تخفیف‌دارها
              </label>
              <label className={styles.switchRow}>
                <input type="checkbox" checked={favFilter}
                  onChange={(e) => setFavFilter(e.target.checked)} />
                فقط علاقه‌مندی‌ها
              </label>
            </div>
          </div>

          {visible.length === 0 ? (
            <p className={styles.emptyState}>
              محصولی با این فیلترها پیدا نشد. فیلترها را تغییر دهید.
            </p>
          ) : (
            <div className={styles.productGrid}>
              {visible.map((p) => {
                const fav = favorites.includes(p.id);
                const inCart = cart.find((l) => l.id === p.id);
                return (
                  <article key={p.id} className={styles.productCard}>
                    <button
                      type="button"
                      className={`${styles.favBtn} ${fav ? styles.favBtnActive : ""}`}
                      aria-pressed={fav}
                      aria-label={fav ? `حذف ${p.name} از علاقه‌مندی‌ها` : `افزودن ${p.name} به علاقه‌مندی‌ها`}
                      onClick={() => toggleFav(p.id)}
                    >
                      <Icon name={fav ? "heartFilled" : "heart"} size={17} />
                    </button>
                    {p.oldPrice && (
                      <span className={styles.discountTag}>
                        {faNum(Math.round((1 - p.price / p.oldPrice) * 100))}٪ تخفیف
                      </span>
                    )}
                    <ProductArt product={p} />
                    <h3 className={styles.productName}>{p.name}</h3>
                    <div className={styles.productMeta}>
                      <span className={styles.stars} aria-hidden>
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Icon key={i} name="star" size={11} />
                        ))}
                      </span>
                      <span className={styles.ratingNum}>{faNum(p.rating)}</span>
                    </div>
                    <div className={styles.productFoot}>
                      <div className={styles.priceCol}>
                        {p.oldPrice && (
                          <s className={styles.priceOld}>{faNum(p.oldPrice)}</s>
                        )}
                        <strong className={styles.priceNow}>
                          {faNum(p.price)} <span className={styles.currency}>تومان</span>
                        </strong>
                      </div>
                      <button
                        type="button"
                        className={styles.addBtn}
                        onClick={() => addToCart(p.id, p.name)}
                      >
                        <Icon name={inCart ? "cart" : "plus"} size={15} />
                        {inCart ? `در سبد (${faNum(inCart.qty)})` : "افزودن"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <footer className={styles.footer}>
          <span className={styles.footerBrand}>
            <Icon name="leaf" size={16} /> Lunéa Natural Beauty
          </span>
          <p>© ۱۴۰۳ لونِیا — نسخه نمایشی؛ محصولات و داده‌ها نمونه هستند.</p>
        </footer>
      </main>

      {/* mobile search (below header, small screens) */}
      <div className={styles.mobileSearchWrap}>
        <label className={styles.srOnly} htmlFor="mobile-search">جستجوی محصولات</label>
        <input
          id="mobile-search"
          className={styles.searchInput}
          type="search"
          placeholder="جستجوی محصولات..."
          value={mobileSearch}
          onChange={(e) => { setMobileSearch(e.target.value); setQuery(e.target.value); }}
        />
      </div>

      <CartDrawer
        open={cartOpen}
        lines={cart}
        onClose={() => setCartOpen(false)}
        onQty={(id, delta) =>
          setCart((c) =>
            c
              .map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l))
              .filter((l) => l.qty > 0)
          )
        }
        onRemove={(id) => setCart((c) => c.filter((l) => l.id !== id))}
      />

      {info && <InfoModal kind={info} onClose={() => setInfo(null)} />}

      <div className={styles.toast} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}
