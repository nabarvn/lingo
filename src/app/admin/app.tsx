"use client";

import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

import {
  CourseList,
  CourseCreate,
  CourseEdit,
} from "../../components/admin/course";

import { UnitList, UnitCreate, UnitEdit } from "../../components/admin/unit";

import {
  LessonList,
  LessonCreate,
  LessonEdit,
} from "../../components/admin/lesson";

import {
  ChallengeList,
  ChallengeCreate,
  ChallengeEdit,
} from "../../components/admin/challenge";

import {
  ChallengeOptionList,
  ChallengeOptionCreate,
  ChallengeOptionEdit,
} from "../../components/admin/challenge-option";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        recordRepresentation="title"
      />

      <Resource
        name="units"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
        recordRepresentation="title"
      />

      <Resource
        name="lessons"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
        recordRepresentation="title"
      />

      <Resource
        name="challenges"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
        recordRepresentation="question"
      />

      <Resource
        name="challengeOptions"
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        recordRepresentation="text"
        options={{ label: "Challenge Options" }}
      />
    </Admin>
  );
};

export default App;
