import {
  Datagrid,
  List,
  TextField,
  ReferenceField,
  NumberField,
} from "react-admin";

const LessonList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <NumberField source="order" />
      <TextField source="title" />
      <ReferenceField source="unitId" reference="units" />
    </Datagrid>
  </List>
);

export default LessonList;
