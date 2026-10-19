interface SectionHeadingProps {
  title: string;
  description: string;
  action: string;
}

export function SectionHeading({ title, description, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-[#6B5350]">{description}</p>
      </div>
      <a
        href="#"
        className="text-sm font-medium text-[#A67C52] underline-offset-4 transition hover:text-[#3D2C2A] hover:underline"
      >
        {action} ←
      </a>
    </div>
  );
}