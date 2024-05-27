import { SimpleForm, Create, TextInput, required } from "react-admin";

const CourseCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Title" validate={[required()]} />
      <TextInput source="imageSrc" label="Image" validate={[required()]} />
    </SimpleForm>
  </Create>
);

export default CourseCreate;
