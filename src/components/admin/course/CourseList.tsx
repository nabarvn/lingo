import { Datagrid, List, TextField } from "react-admin";

const CourseList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="imageSrc" />
    </Datagrid>
  </List>
);

export default CourseList;
