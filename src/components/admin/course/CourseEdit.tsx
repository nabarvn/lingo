import { SimpleForm, Edit, TextInput, required } from "react-admin";

const CourseEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" label="Id" validate={[required()]} />
      <TextInput source="title" label="Title" validate={[required()]} />
      <TextInput source="imageSrc" label="Image" validate={[required()]} />
    </SimpleForm>
  </Edit>
);

export default CourseEdit;
