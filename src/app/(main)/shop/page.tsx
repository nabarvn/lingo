import Image from "next/image";
import { redirect } from "next/navigation";

import Items from "./items";
import { getUserProgress, getUserSubscription } from "@/server/db/queries";
import { FeedWrapper, UserProgress, StickyWrapper, Quests } from "@/components";

const ShopPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-col md:flex-row md:gap-4 lg:gap-[48px] px-6">
      <div className="sticky top-[60px] bg-white md:hidden border-b-2 z-50 py-3">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </div>

      <FeedWrapper>
        <div className="flex flex-col items-center w-full mt-7">
          <Image src="/shop.svg" alt="Shop" height={90} width={90} />

          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Shop
          </h1>

          <p className="text-muted-foreground text-center text-balance text-lg mb-6">
            Spend your points on cool stuff.
          </p>

          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </FeedWrapper>

      <StickyWrapper className="mt-6">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />

        <Quests points={userProgress.points} />
      </StickyWrapper>
    </div>
  );
};

export default ShopPage;
