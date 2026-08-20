import { FormEventHandler } from 'react';
import {
  Form,
  TextField,
  TextArea,
  Label,
  Input,
  FieldError,
  Button,
  Modal,
} from '@heroui/react';

export interface StoredFileFormData {
  name: string;
  description: string;
}

interface StoredFileFormProps {
  data: StoredFileFormData;
  setData: (key: keyof StoredFileFormData, value: string) => void;
  errors: Partial<Record<keyof StoredFileFormData, string[]>>;
  processing: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
  submitLabel: 'Create' | 'Update';
}

export default function StoredFileForm({
  data,
  setData,
  errors,
  processing,
  onSubmit,
  onCancel,
  submitLabel,
}: StoredFileFormProps) {
  const validationErrors = Object.fromEntries(
    Object.entries(errors)
      .filter(([, message]) => !!message)
      .map(([field, message]) => [field, message])
  );

  return (
    <Form
      validationBehavior="aria"
      validationErrors={validationErrors}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <Modal.Header>
        <Modal.Heading>
          {submitLabel === 'Create' ? 'New File' : 'Edit File'}
        </Modal.Heading>
      </Modal.Header>

      <Modal.Body className="flex flex-col gap-4">
        <TextField
          name="name"
          isRequired
          isInvalid={!!errors.name}
          value={data.name}
          onChange={(value) => setData('name', value)}
          fullWidth
        >
          <Label>Name</Label>
          <Input placeholder="Enter a name" autoFocus />
          <FieldError>{errors.name}</FieldError>
        </TextField>

        <TextField
          name="description"
          isInvalid={!!errors.description}
          value={data.description}
          onChange={(value) => setData('description', value)}
          fullWidth
        >
          <Label>Description</Label>
          <TextArea placeholder="Enter a description" rows={4} />
          <FieldError>{errors.description}</FieldError>
        </TextField>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onPress={onCancel} isDisabled={processing}>
          Cancel
        </Button>
        <Button type="submit" isPending={processing}>
          {submitLabel}
        </Button>
      </Modal.Footer>
    </Form>
  );
}