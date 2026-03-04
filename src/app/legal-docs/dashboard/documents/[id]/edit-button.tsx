"use client";

import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

interface EditAndRegenerateButtonProps {
  docType: string;
  formData: Record<string, string>;
  href: string;
}

export function EditAndRegenerateButton({
  docType,
  formData,
  href,
}: EditAndRegenerateButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        localStorage.setItem(`draft_${docType}`, JSON.stringify(formData));
        router.push(href);
      }}
      className="h-9 px-3 inline-flex items-center gap-1.5 rounded-lg text-[13px] text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 ring-1 ring-orange-500/20 transition-all"
    >
      <Pencil className="h-3.5 w-3.5" />
      Edit &amp; Regenerate
    </button>
  );
}
