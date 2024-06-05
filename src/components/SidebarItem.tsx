"use client";

import Image from "next/image";
import { Button } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";

type SidebarItemProps = {
  href: string;
  label: string;
  iconSrc: string;
};

const SidebarItem = ({ href, label, iconSrc }: SidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      onClick={() => router.push(href)}
      variant={active ? "sidebar" : "sidebarOutline"}
      className="h-[52px] justify-start"
    >
      <Image
        alt={label}
        src={iconSrc}
        height={32}
        width={32}
        className="mr-5 md:mr-3 lg:mr-5"
      />

      {label}
    </Button>
  );
};

export default SidebarItem;
