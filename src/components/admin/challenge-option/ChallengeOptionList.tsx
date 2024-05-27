import {
  Datagrid,
  List,
  TextField,
  ReferenceField,
  NumberField,
  BooleanField,
} from "react-admin";

const ChallengeOptionList = () => (
  <List>
    <Datagrid rowClick="edit">
      <NumberField source="id" />
      <TextField source="text" />
      <BooleanField source="correct" />
      <TextField source="imageSrc" />
      <TextField source="audioSrc" />
      <ReferenceField source="challengeId" reference="challenges" />
    </Datagrid>
  </List>
);

export default ChallengeOptionList;
