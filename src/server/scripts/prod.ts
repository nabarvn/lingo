import * as dotenv from "dotenv";
import * as schema from "@/server/db/schema";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// helps the seeding script read from `.env`
// important for connecting to the database
dotenv.config();

const connector = neon(process.env.DATABASE_URL as string);

const db = drizzle(connector, { schema });

const main = async () => {
  try {
    console.log("🟠 Seeding database");

    // delete all existing data
    await Promise.all([
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challenges),
      db.delete(schema.userProgress),
      db.delete(schema.challengeOptions),
      db.delete(schema.challengeProgress),
      db.delete(schema.userSubscription),
    ]);

    // insert courses
    const courses = await db
      .insert(schema.courses)
      .values([{ title: "Spanish", imageSrc: "/es.svg" }])
      .returning();

    // insert units for each course
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: "Basic Level",
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: "Intermediate Level",
            order: 2,
          },
        ])
        .returning();

      // insert lessons for each unit
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // insert challenges for each lesson
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the man"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the woman"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the boy"?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the man"',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the zombie"?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the robot"?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the girl"?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the zombie"',
                order: 8,
              },
            ])
            .returning();

          // insert challenge options for each challenge
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el hombre",
                  imageSrc: "/man.svg",
                  audioSrc: "/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  imageSrc: "/woman.svg",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  imageSrc: "/boy.svg",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "la mujer",
                  imageSrc: "/woman.svg",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  imageSrc: "/boy.svg",
                  audioSrc: "/es_boy.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el hombre",
                  imageSrc: "/man.svg",
                  audioSrc: "/es_man.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  imageSrc: "/woman.svg",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el hombre",
                  imageSrc: "/man.svg",
                  audioSrc: "/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el chico",
                  imageSrc: "/boy.svg",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el hombre",
                  audioSrc: "/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el hombre",
                  imageSrc: "/man.svg",
                  audioSrc: "/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  imageSrc: "/woman.svg",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/es_zombie.mp3",
                },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el robot",
                  imageSrc: "/robot.svg",
                  audioSrc: "/es_robot.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/es_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  imageSrc: "/boy.svg",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "la niña",
                  imageSrc: "/girl.svg",
                  audioSrc: "/es_girl.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/es_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el hombre",
                  imageSrc: "/man.svg",
                  audioSrc: "/es_man.mp3",
                },
              ]);
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el zombie",
                  audioSrc: "/es_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }
          }
        }
      }
    }
    console.log("🟢 Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("🔴 Failed to seed database");
  }
};

main();
