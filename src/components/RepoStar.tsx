"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui";

const RepoStar = () => (
  <Button
    asChild
    size="icon"
    variant="super"
    className="h-9 w-9 md:h-10 md:w-10 shrink-0"
  >
    <Link
      target="_blank"
      referrerPolicy="no-referrer"
      href="https://git.new/lingo"
    >
      <Star className="h-5 w-5 stroke-amber-200 fill-amber-200" />
    </Link>
  </Button>
);

export default RepoStar;
