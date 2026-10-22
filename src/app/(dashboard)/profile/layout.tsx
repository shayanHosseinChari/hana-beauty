// src/app/profile/layout.tsx
import { ProfileSidebar } from "@/features/profile/components/ProfileSidebar";
import { USER_PROFILE } from "@/features/profile/data/profile.data";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#FDF7F5] to-[#F9EFEB]"
    >
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#3D2C2A] sm:text-2xl">
            پنل کاربری
          </h1>
          <p className="mt-1 text-xs text-[#A78A85]">
            خوش آمدید، {USER_PROFILE.name}
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <ProfileSidebar
            userName={USER_PROFILE.name}
            userPhone={USER_PROFILE.phone}
          />
          <section className="min-w-0 flex-1">{children}</section>
        </div>
      </div>
    </main>
  );
}