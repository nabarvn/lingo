import {
  SimpleForm,
  Create,
  TextInput,
  ReferenceInput,
  NumberInput,
  required,
} from "react-admin";

const UnitCreate = () => (
  <Create>
    <SimpleForm>
      <NumberInput source="order" label="Order" validate={[required()]} />
      <TextInput source="title" label="Title" validate={[required()]} />

      <TextInput
        source="description"
        label="Description"
        validate={[required()]}
      />

      <ReferenceInput source="courseId" reference="courses" />
    </SimpleForm>
  </Create>
);

export default UnitCreate;
