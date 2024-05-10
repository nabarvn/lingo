import Link from "next/link";
import { NotebookText } from "lucide-react";

import { Button } from "@/components/ui";

type UnitBannerProps = {
  title: string;
  description: string;
};

const UnitBanner = ({ title, description }: UnitBannerProps) => {
  return (
    <div className="flex items-center justify-between bg-green-500 text-white w-full gap-2 rounded-xl p-5">
      <div className="space-y-1.5">
        <h3 className="text-xl lg:text-2xl font-bold">{title}</h3>
        <p className="text-base lg:text-lg">{description}</p>
      </div>

      <Link href="/lesson" className="self-start">
        <Button
          size="sm"
          variant="secondary"
          className="flex border-2 border-b-4 active:border-b-2"
        >
          <NotebookText className="h-4 w-4 lg:mr-2" />
          <span className="hidden lg:block">Continue</span>
        </Button>
      </Link>
    </div>
  );
};

export default UnitBanner;
