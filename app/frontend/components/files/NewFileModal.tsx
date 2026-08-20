import { Modal } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import StoredFileForm from './StoredFileForm';
import { fileUploader } from '@/routes';

interface NewFileModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function NewFileModal({ isOpen, onOpenChange }: NewFileModalProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    description: '',
  });

  const close = () => {
    onOpenChange(false);
    reset();
  };

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(fileUploader.create().url, {
      onSuccess: close,
      preserveScroll: true,
    });
  };

  return (
    <Modal>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange} isDismissable>
        <Modal.Container placement="center" size="md">
          <Modal.Dialog aria-label="New file">
            <StoredFileForm
              data={data}
              setData={setData}
              errors={errors}
              processing={processing}
              onSubmit={submit}
              onCancel={close}
              submitLabel="Create"
            />
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}