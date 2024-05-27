import {
  SimpleForm,
  Create,
  TextInput,
  ReferenceInput,
  NumberInput,
  required,
} from "react-admin";

const LessonCreate = () => (
  <Create>
    <SimpleForm>
      <NumberInput source="order" label="Order" validate={[required()]} />
      <TextInput source="title" label="Title" validate={[required()]} />
      <ReferenceInput source="unitId" reference="units" />
    </SimpleForm>
  </Create>
);

export default LessonCreate;
