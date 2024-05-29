import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { quests } from "@/constants";
import { Button, Progress } from "@/components/ui";

type QuestsProps = {
  points: number;
};

const Quests = ({ points }: QuestsProps) => (
  <div className="border-2 rounded-xl space-y-4 p-4">
    <div className="flex items-center justify-between w-full">
      <h3 className="font-bold text-lg">Quests</h3>

      <Link href="/quests">
        <Button size="sm" variant="primaryOutline">
          View all
        </Button>
      </Link>
    </div>

    <ul className="w-full space-y-4">
      {quests.map((quest, i) => {
        const progress = (points / quest.value) * 100;

        return (
          <div
            key={quest.title}
            className={cn("flex items-center w-full gap-x-3 pb-4", {
              hidden: i > 2,
            })}
          >
            <Image src="/points.svg" alt="Points" width={40} height={40} />

            <div className="flex flex-col gap-y-2 w-full">
              <p className="text-neutral-700 text-sm font-bold">
                {quest.title}
              </p>

              <Progress value={progress} className="h-2" />
            </div>
          </div>
        );
      })}
    </ul>
  </div>
);

export default Quests;
