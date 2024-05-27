import {
  SimpleForm,
  Edit,
  TextInput,
  ReferenceInput,
  NumberInput,
  required,
} from "react-admin";

const UnitEdit = () => (
  <Edit>
    <SimpleForm>
      <NumberInput source="id" label="Id" validate={[required()]} />
      <NumberInput source="order" label="Order" validate={[required()]} />
      <TextInput source="title" label="Title" validate={[required()]} />

      <TextInput
        source="description"
        label="Description"
        validate={[required()]}
      />

      <ReferenceInput source="courseId" reference="courses" />
    </SimpleForm>
  </Edit>
);

export default UnitEdit;
