import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from "@/server/db/queries";

import { Separator } from "@/components/ui";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";

import {
  FeedWrapper,
  UserProgress,
  StickyWrapper,
  Promo,
  Quests,
} from "@/components";

const LeaderboardPage = async () => {
  const leaderboardData = getTopTenUsers();
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [leaderboard, userProgress, userSubscription] = await Promise.all([
    leaderboardData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-col md:flex-row md:gap-4 lg:gap-[48px] px-6">
      <div className="sticky top-[50px] bg-white md:hidden border-b-2 z-50 py-3">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </div>

      <FeedWrapper>
        <div className="flex flex-col items-center w-full mt-7">
          <Image
            src="/leaderboard.svg"
            alt="Leaderboard"
            height={90}
            width={90}
          />

          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Leaderboard
          </h1>

          <p className="text-muted-foreground text-center text-balance text-lg mb-6">
            See where you stand among other learners in the community.
          </p>

          <Separator className="mb-4 h-0.5 rounded-full" />

          {leaderboard.map((userProgress, index) => (
            <div
              key={userProgress.userId}
              className="flex items-center w-full rounded-xl gap-2 hover:bg-gray-200/50 p-2 px-4"
            >
              <p className="font-bold text-lime-700 mr-2">{index + 1}</p>

              <Avatar className="border bg-green-500 h-8 w-8 lg:h-10 lg:w-10">
                <AvatarImage
                  className="object-cover"
                  src={userProgress.userImageSrc}
                />
              </Avatar>

              <p className="flex-1 font-bold text-neutral-800">
                {userProgress.userName}
              </p>

              <p className="text-muted-foreground text-sm lg:text-base">
                {userProgress.points} XP
              </p>
            </div>
          ))}
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
        <Quests points={userProgress.points} />
      </StickyWrapper>
    </div>
  );
};

export default LeaderboardPage;
