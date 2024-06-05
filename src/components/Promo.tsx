import Image from "next/image";

import { cn } from "@/lib/utils";
import { UpgradeButton } from "@/components";

type PromoProps = {
  isMobile?: boolean;
  className?: string;
};

const Promo = ({ isMobile, className }: PromoProps) => (
  <div className={cn("border-2 rounded-xl space-y-4 p-4", className)}>
    <div className="space-y-2">
      <div className="flex items-center justify-center gap-x-2">
        <Image src="/unlimited.svg" alt="Pro" height={26} width={26} />
        <h3 className="font-bold text-lg">Upgrade to Pro</h3>
      </div>

      <p className="text-muted-foreground text-center">
        Get unlimited hearts and more!
      </p>
    </div>

    <UpgradeButton isMobile={isMobile} />
  </div>
);

export default Promo;
