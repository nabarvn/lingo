import {
  SimpleForm,
  Edit,
  TextInput,
  ReferenceInput,
  NumberInput,
  required,
} from "react-admin";

const LessonEdit = () => (
  <Edit>
    <SimpleForm>
      <NumberInput source="order" label="Order" validate={[required()]} />
      <TextInput source="title" label="Title" validate={[required()]} />
      <ReferenceInput source="unitId" reference="units" />
    </SimpleForm>
  </Edit>
);

export default LessonEdit;
