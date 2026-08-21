import { Modal } from "@heroui/react";
import { useForm } from "@inertiajs/react";
import StoredFileForm from "./StoredFileForm";
import { StoredFile } from "@/types/serializers";
import { fileUploader } from "@/routes";

interface EditFileModalProps {
  onOpenChange: (isOpen: boolean) => void;
  storedFile: StoredFile;
}

export default function EditFileModal({
  onOpenChange,
  storedFile,
}: EditFileModalProps) {
  const { data, setData, patch, processing, errors, reset } = useForm({
    name: storedFile.name,
    description: storedFile.description,
  });

  const close = () => {
    onOpenChange(false);
    reset();
  };

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    patch(fileUploader.update(storedFile.id).url, {
      onSuccess: close,
      preserveScroll: true,
    });
  };

  return (
    <Modal>
      <Modal.Trigger tabIndex={0} className="sr-only">
        Open
      </Modal.Trigger>
      <Modal.Backdrop
        isOpen
        onOpenChange={(open) => !open && onOpenChange(open)}
        isDismissable
      >
        <Modal.Container placement="center" size="md">
          <Modal.Dialog aria-label="New file">
            <StoredFileForm
              data={data}
              setData={setData}
              errors={errors}
              processing={processing}
              onSubmit={submit}
              onCancel={close}
              submitLabel="Update"
            />
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
