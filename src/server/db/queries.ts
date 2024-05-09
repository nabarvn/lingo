import { cache } from "react";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import db from "@/server/db/drizzle";

import {
  challengeProgress,
  courses,
  units,
  userProgress,
} from "@/server/db/schema";

export const getUserProgress = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();

  return data;
});

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });

  return data;
});

export const getUnits = cache(async () => {
  const { userId } = auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false };
      }

      // checks if all challenges within the lesson are completed
      // the outer `.every()` call checks if every `challenge` within the array meets the condition specified by the inner `.every()` call
      const allCompletedChallenges = lesson.challenges.every(
        (challenge) =>
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          // the `every` method returns `true` if all elements in an array satisfy the provided testing function
          // checks if the `completed` property of each progress object within `challenge.challengeProgress` is truthy
          challenge.challengeProgress.every((progress) => progress.completed)
      );

      // returns the lesson object with an additional property `completed`
      return { ...lesson, completed: allCompletedChallenges };
    });

    // returns the unit object with lessons now including completed status
    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
});
