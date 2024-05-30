import { lessons, units } from "@/server/db/schema";

import UnitBanner from "./unit-banner";
import LessonButton from "./lesson-button";

type UnitProps = {
  id: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;
  activeLessonPercentage: number;
};

const Unit = ({
  id,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) => {
  let unitAccess = false;
  const allCompletedLessons = lessons.every((lesson) => lesson.completed);

  if (activeLesson?.unitId === id || allCompletedLessons) unitAccess = true;

  return (
    <>
      <UnitBanner title={title} description={description} access={unitAccess} />

      <div className="relative flex flex-col items-center">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              id={lesson.id}
              key={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};

export default Unit;
