"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import { usePathname } from "next/navigation";

type SidebarItemProps = {
  href: string;
  label: string;
  iconSrc: string;
};

const SidebarItem = ({ href, label, iconSrc }: SidebarItemProps) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      asChild
      variant={active ? "sidebar" : "sidebarOutline"}
      className="h-[52px] justify-start"
    >
      <Link href={href}>
        <Image
          alt={label}
          src={iconSrc}
          height={32}
          width={32}
          className="mr-5 md:mr-3 lg:mr-5"
        />
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
