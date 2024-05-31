import Link from "next/link";
import { cn } from "@/lib/utils";
import { NotebookText } from "lucide-react";

import { Button } from "@/components/ui";

type UnitBannerProps = {
  title: string;
  description: string;
  access: boolean;
};

const UnitBanner = ({ title, description, access }: UnitBannerProps) => (
  <div
    className={cn(
      "flex items-center justify-between bg-green-500 text-white w-full gap-2 rounded-xl p-5",
      {
        "bg-neutral-200 text-neutral-400": !access,
      }
    )}
  >
    <div className="space-y-1.5">
      <h3 className="text-xl lg:text-2xl font-bold">{title}</h3>
      <p className="text-base lg:text-lg">{description}</p>
    </div>

    <Link
      href="/lesson"
      aria-disabled={!access}
      className={cn("self-start", {
        "pointer-events-none": !access,
      })}
    >
      <Button
        size="sm"
        variant={!access ? "locked" : "secondary"}
        disabled={!access}
        className={cn("flex border-2 border-b-4 active:border-b-2", {
          "text-neutral-400 border-neutral-500": !access,
        })}
      >
        <NotebookText className="h-4 w-4 lg:mr-2" />
        <span className="hidden lg:block">Continue</span>
      </Button>
    </Link>
  </div>
);

export default UnitBanner;
