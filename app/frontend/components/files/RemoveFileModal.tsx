import { StoredFile } from "@/types/serializers";
import { RemoveElementDialog } from "../RemoveElementDialog";
import { fileUploader } from "@/routes";
import { useState } from "react";
import { router } from "@inertiajs/react";



interface RemoveFileModalProps {
  onOpenChange: (open: boolean) => void;
  storedFile: StoredFile;
}

export default function RemoveFileModal({ onOpenChange, storedFile }: RemoveFileModalProps) {

  const [isDeleting, setIsDeleting] = useState(false);

  const close = () => onOpenChange(false);

  const handleConfirm = () => {
    setIsDeleting(true);
    router.delete(fileUploader.destroy(storedFile.id).url, {
      preserveScroll: true,
      onSuccess: close,
      onFinish: () => setIsDeleting(false),
    });
  };

  return (
    <RemoveElementDialog onOpenChange={(open) => !isDeleting && onOpenChange(open)} confirm="Delete" cancel="Cancel" body="This will permanently delete your file from our servers. This action is irreversible" header="Delete File" onConfirm={handleConfirm} onCancel={close} />
  );
}
