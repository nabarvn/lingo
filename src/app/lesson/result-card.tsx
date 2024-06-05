import Image from "next/image";

import { cn } from "@/lib/utils";

type ResultCardProps = {
  value: number;
  variant: "points" | "hearts";
};

const ResultCard = ({ value, variant }: ResultCardProps) => {
  const imageSrc = variant === "hearts" ? "/heart.svg" : "/points.svg";

  return (
    <div
      className={cn("rounded-2xl border-2 w-full", {
        "bg-orange-400 border-orange-400": variant === "points",
        "bg-rose-500 border-rose-500": variant === "hearts",
      })}
    >
      <div
        className={cn(
          "text-white rounded-t-xl font-bold text-center uppercase text-xs p-1.5",
          {
            "bg-rose-500": variant === "hearts",
            "bg-orange-400": variant === "points",
          }
        )}
      >
        {variant === "hearts" ? "Hearts Left" : "Earned XP"}
      </div>

      <div
        className={cn(
          "flex items-center justify-center rounded-2xl bg-white font-bold text-lg p-6",
          {
            "text-rose-500": variant === "hearts",
            "text-orange-400": variant === "points",
          }
        )}
      >
        <Image
          src={imageSrc}
          alt="Icon"
          height={30}
          width={30}
          className="mr-1.5"
        />

        {value}
      </div>
    </div>
  );
};

export default ResultCard;
