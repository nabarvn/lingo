import {
  SimpleForm,
  Create,
  TextInput,
  ReferenceInput,
  NumberInput,
  required,
  SelectInput,
} from "react-admin";

const ChallengeCreate = () => (
  <Create>
    <SimpleForm>
      <NumberInput source="order" label="Order" validate={[required()]} />
      <TextInput source="question" label="Question" validate={[required()]} />

      <SelectInput
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
        validate={[required()]}
      />

      <ReferenceInput source="lessonId" reference="lessons" />
    </SimpleForm>
  </Create>
);

export default ChallengeCreate;
