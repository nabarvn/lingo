import {
  SimpleForm,
  Edit,
  TextInput,
  ReferenceInput,
  NumberInput,
  required,
  SelectInput,
} from "react-admin";

const ChallengeEdit = () => (
  <Edit>
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
  </Edit>
);

export default ChallengeEdit;
