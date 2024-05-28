import {
  Datagrid,
  List,
  TextField,
  ReferenceField,
  NumberField,
  SelectField,
} from "react-admin";

const ChallengeList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <NumberField source="order" />
      <TextField source="question" />

      <SelectField
        source="type"
        choices={[
          {
            id: "SELECT",
            name: "SELECT",
          },
          {
            id: "ASSIST",
            name: "ASSIST",
          },
        ]}
      />

      <ReferenceField source="lessonId" reference="lessons" />
    </Datagrid>
  </List>
);

export default ChallengeList;
