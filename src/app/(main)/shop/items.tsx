"use client";

import { toast } from "sonner";
import Image from "next/image";
import { useTransition } from "react";

import { Button } from "@/components/ui";
import { refillHearts } from "@/server/actions/user-progress";
import { DEFAULT_HEARTS_MAX, POINTS_TO_REFILL } from "@/constants";
import { createStripeUrl } from "@/server/actions/user-subscription";

type ItemsProps = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const Items = ({ hearts, points, hasActiveSubscription }: ItemsProps) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === DEFAULT_HEARTS_MAX || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts().catch(() => toast.error("Something went wrong."));
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data;
          }
        })
        .catch(() => toast.error("Something went wrong."));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex flex-col lg:flex-row items-center w-full gap-x-4 gap-y-4 border-t-2 p-4">
        <Image src="/heart.svg" alt="Heart" height={60} width={60} />

        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>

        <Button
          size="sm"
          onClick={onRefillHearts}
          disabled={
            pending ||
            hearts === DEFAULT_HEARTS_MAX ||
            points < POINTS_TO_REFILL
          }
        >
          {hearts === DEFAULT_HEARTS_MAX ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row items-center w-full gap-x-4 gap-y-4 border-t-2 p-4 pt-8">
        <Image src="/unlimited.svg" alt="Unlimited" height={60} width={60} />

        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Unlimited hearts
          </p>
        </div>

        <Button size="sm" onClick={onUpgrade} disabled={pending}>
          {hasActiveSubscription ? "settings" : "upgrade"}
        </Button>
      </div>
    </ul>
  );
};

export default Items;
