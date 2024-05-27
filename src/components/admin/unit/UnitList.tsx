import { Datagrid, List, TextField, ReferenceField } from "react-admin";

const UnitList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="order" />
      <TextField source="title" />
      <TextField source="description" />
      <ReferenceField source="courseId" reference="courses" />
    </Datagrid>
  </List>
);

export default UnitList;
