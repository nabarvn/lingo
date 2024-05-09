import { redirect } from "next/navigation";
import { getUnits, getUserProgress } from "@/server/db/queries";
import { FeedWrapper, StickyWrapper, UserProgress } from "@/components";

import { Header } from "./header";

const LearnPage = async () => {
  const unitsData = getUnits();
  const userProgressData = getUserProgress();

  const [units, userProgress] = await Promise.all([
    unitsData,
    userProgressData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />

        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            {/* TODO: implement `Unit` component */}
          </div>
        ))}
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
