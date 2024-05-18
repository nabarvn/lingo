import Image from "next/image";

import { cn } from "@/lib/utils";
import { challenges } from "@/server/db/schema";

type CardProps = {
  text: string;
  imageSrc: string | null;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  status?: "correct" | "wrong" | "none";
  audioSrc: string | null;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

const Card = ({
  text,
  imageSrc,
  shortcut,
  selected,
  onClick,
  status,
  audioSrc,
  disabled,
  type,
}: CardProps) => {
  return (
    <div
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 p-4 lg:p-6",
        {
          "border-sky-300 bg-sky-100 hover:bg-sky-100": selected,
          "border-green-300 bg-green-100 hover:bg-green-100":
            selected && status === "correct",
          "border-rose-300 bg-rose-100 hover:bg-rose-100":
            selected && status === "wrong",
          "pointer-events-none hover:bg-white": disabled,
          "w-full lg:p-3": type === "ASSIST",
        }
      )}
    >
      {imageSrc && (
        <div className="relative aspect-square max-h-[80px] lg:max-h-[150px] w-full mb-4">
          <Image fill src={imageSrc} alt={text} />
        </div>
      )}

      <div
        className={cn("flex items-center justify-between", {
          "flex-row-reverse": type === "ASSIST",
        })}
      >
        {type === "ASSIST" && <div />}

        <p
          className={cn("text-neutral-600 text-sm lg:text-base", {
            "text-sky-500": selected,
            "text-green-500": selected && status === "correct",
            "text-rose-500": selected && status === "wrong",
          })}
        >
          {text}
        </p>

        <div
          className={cn(
            "flex items-center justify-center rounded-lg border-2 text-neutral-400 lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] lg:text-[15px] text-xs font-semibold",
            {
              "border-sky-300 text-sky-500": selected,
              "border-green-500 text-green-500":
                selected && status === "correct",
              "border-rose-500 text-rose-500": selected && status === "wrong",
            }
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};

export default Card;
