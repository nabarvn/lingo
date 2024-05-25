import { redirect } from "next/navigation";
import { FeedWrapper, StickyWrapper, UserProgress } from "@/components";

import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from "@/server/db/queries";

import Unit from "./unit";
import Header from "./header";

const LearnPage = async () => {
  const unitsData = getUnits();
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const userSubscriptionData = getUserSubscription();

  const [
    units,
    userProgress,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    unitsData,
    userProgressData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex gap-4 lg:gap-[48px] px-6">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />

        {units.map((unit) => (
          <div key={unit.id} className="mb-10 pt-6">
            <Unit
              title={unit.title}
              description={unit.description}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
