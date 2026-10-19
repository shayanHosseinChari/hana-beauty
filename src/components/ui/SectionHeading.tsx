interface SectionHeadingProps {
  title: string;
  description: string;
  action: string;
  actionHref?: string;
}

export function SectionHeading({
  title,
  description,
  action,
  actionHref = "#",
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-px w-8 bg-gradient-to-r from-[#D9827C] to-transparent" />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#A67C52]">
            دسته‌بندی
          </span>
        </div>

        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[#241B1A] sm:text-3xl">
          {title}
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-7 text-[#6B5350]">
          {description}
        </p>
      </div>

      <a
        href={actionHref}
        className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#E8D5CE] bg-white/70 px-5 py-2.5 text-sm font-medium text-[#8C4A43] backdrop-blur-sm transition-all duration-300 hover:border-[#D9827C]/50 hover:bg-white hover:text-[#3D2C2A] hover:shadow-[0_6px_20px_-8px_rgba(217,130,124,.45)] sm:self-auto"
      >
        <span>{action}</span>
        <span className="grid size-6 place-items-center rounded-full bg-[#F2D6CD]/60 transition-all duration-300 group-hover:bg-[#D9827C] group-hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </span>
      </a>
    </div>
  );
}