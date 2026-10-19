import type { Goal, GoalKey } from "../types/types";

export const goals: Record<GoalKey, Goal> = {
  glow: {
    label: "درخشش",
    icon: "✦",
    intro: "برای پوستی شفاف، شاداب و درخشان با جلوه‌ای طبیعی.",
    steps: [
      {
        title: "پاکسازی ملایم",
        description: "پاک‌کردن آلودگی‌ها بدون از بین بردن چربی‌های مفید پوست.",
        product: "Botanical Cleansing Gel",
      },
      {
        title: "سرم روشن‌کننده",
        description: "کمک به یکنواختی رنگ پوست و افزایش جلوه‌ی درخشش.",
        product: "Cherry Blossom Glow Serum",
      },
      {
        title: "آبرسانی نهایی",
        description: "قفل‌کردن رطوبت برای نمایی نرم و شفاف در طول روز.",
        product: "Rosegold Barrier Cream",
      },
    ],
  },
  acne: {
    label: "جوش",
    icon: "◌",
    intro: "روتینی متعادل برای کنترل چربی و آرام‌کردن پوست مستعد جوش.",
    steps: [
      {
        title: "پاکسازی متعادل",
        description: "تمیزکردن منافذ بدون ایجاد حس کشیدگی یا خشکی.",
        product: "Botanical Cleansing Gel",
      },
      {
        title: "درمان هدفمند",
        description: "فرمولی سبک برای کمک به کاهش التهاب و ظاهر جوش‌ها.",
        product: "Clarifying Balance Serum",
      },
      {
        title: "مرطوب‌کننده سبک",
        description: "حفظ رطوبت پوست بدون ایجاد حس سنگینی یا چربی.",
        product: "Cloud Barrier Gel",
      },
    ],
  },
  blemish: {
    label: "لک",
    icon: "✧",
    intro: "تمرکز روی یکنواختی رنگ پوست و کاهش ظاهر لک‌های سطحی.",
    steps: [
      {
        title: "پاکسازی روزانه",
        description: "آماده‌سازی پوست برای جذب بهتر ترکیبات فعال.",
        product: "Botanical Cleansing Gel",
      },
      {
        title: "روشن‌کننده‌ی ملایم",
        description: "کمک به کاهش تیرگی و بازگرداندن شفافیت پوست.",
        product: "Niacinamide Radiance Serum",
      },
      {
        title: "محافظت و ترمیم",
        description: "تقویت سد دفاعی برای جلوگیری از کدرشدن مجدد پوست.",
        product: "Rosegold Barrier Cream",
      },
    ],
  },
  dryness: {
    label: "خشکی",
    icon: "◒",
    intro: "روتینی مغذی برای بازگرداندن نرمی و آسودگی به پوست خشک.",
    steps: [
      {
        title: "پاکسازی کرمی",
        description: "پاکسازی آرام همراه با حفظ رطوبت طبیعی پوست.",
        product: "Botanical Cleansing Gel",
      },
      {
        title: "آبرسانی عمیق",
        description: "رساندن رطوبت به لایه‌های مختلف پوست بدون چسبندگی.",
        product: "Hyaluronic Cloud Serum",
      },
      {
        title: "تقویت سد دفاعی",
        description: "کمک به کاهش زبری، پوسته‌پوسته‌شدن و حس کشیدگی.",
        product: "Rosegold Barrier Cream",
      },
    ],
  },
};