import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/Button";
import { getUserSubscription } from "@/server/db/queries";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/Sheet";

import { Menu } from "lucide-react";
import { Promo } from "@/components";
import { sidebarItems } from "@/constants";

const MobileSidebar = async () => {
  const userSubscriptionData = getUserSubscription();

  const [userSubscription] = await Promise.all([userSubscriptionData]);

  const isPro = !!userSubscription?.isActive;

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white h-9 w-9" />
      </SheetTrigger>

      <SheetContent
        className="z-[100] flex flex-col h-full border-r-2 p-0 px-4"
        side="left"
      >
        <SheetClose asChild>
          <Link href="/learn">
            <div className="flex items-center gap-x-3 px-4 py-8">
              <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />

              <h1 className="text-3xl font-extrabold tracking-wide text-green-600">
                Lingo
              </h1>
            </div>
          </Link>
        </SheetClose>

        <div className="flex flex-1 flex-col gap-y-2">
          {sidebarItems.map((item, i) => (
            <SheetClose asChild key={i}>
              <Link
                href={item.href}
                className={cn(
                  buttonVariants({
                    variant: "sidebarOutline",
                    className: "h-[52px] justify-start",
                  })
                )}
              >
                <Image
                  alt={item.label}
                  src={item.iconSrc}
                  height={32}
                  width={32}
                  className="mr-5 md:mr-3 lg:mr-5"
                />

                {item.label}
              </Link>
            </SheetClose>
          ))}
        </div>

        <Promo
          isMobile
          className={cn("mb-4", {
            hidden: isPro,
          })}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
