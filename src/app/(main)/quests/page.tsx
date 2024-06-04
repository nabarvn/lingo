import Image from "next/image";
import { redirect } from "next/navigation";

import { quests } from "@/constants";
import { Progress } from "@/components/ui";
import { getUserProgress, getUserSubscription } from "@/server/db/queries";
import { FeedWrapper, UserProgress, StickyWrapper, Promo } from "@/components";

const QuestsPage = async () => {
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
          <Image src="/quests.svg" alt="Quests" height={90} width={90} />

          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Quests
          </h1>

          <p className="text-muted-foreground text-center text-balance text-lg mb-6">
            Complete quests by earning points.
          </p>

          <ul className="w-full">
            {quests.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100;

              return (
                <div
                  key={quest.title}
                  className="flex items-center w-full gap-x-4 border-t-2 p-4"
                >
                  <Image
                    src="/points.svg"
                    alt="Points"
                    width={60}
                    height={60}
                  />

                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-700 text-xl font-bold">
                      {quest.title}
                    </p>

                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>

      <StickyWrapper className="mt-6">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />

        {!isPro && <Promo />}
      </StickyWrapper>
    </div>
  );
};

export default QuestsPage;
