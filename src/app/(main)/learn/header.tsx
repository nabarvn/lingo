import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => (
  <div className="sticky top-[50px] md:top-0 flex items-center justify-between border-b-2 bg-white text-neutral-400 mb-5 py-3 z-50 md:mt-[-28px] md:pt-[28px]">
    <Link href="/courses">
      <Button size="sm" variant="defaultOutline">
        <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
      </Button>
    </Link>

    <h1 className="text-lg font-bold">{title}</h1>
    <div />
  </div>
);

export default Header;
