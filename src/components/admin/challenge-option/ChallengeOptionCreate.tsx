import {
  SimpleForm,
  Create,
  TextInput,
  ReferenceInput,
  required,
  BooleanInput,
} from "react-admin";

const ChallengeOptionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="text" label="Text" validate={[required()]} />
      <BooleanInput source="correct" label="Correct option" />
      <TextInput source="imageSrc" label="Image URL" />
      <TextInput source="audioSrc" label="Audio URL" />
      <ReferenceInput source="challengeId" reference="challenges" />
    </SimpleForm>
  </Create>
);

export default ChallengeOptionCreate;
