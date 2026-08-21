import { AlertDialog, Button } from "@heroui/react";

type DeleteInfo = {
  onOpenChange: (isOpen: boolean) => void;
  confirm: string;
  cancel: string;
  body: string;
  header: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function RemoveElementDialog(props: DeleteInfo) {
  return (
    <AlertDialog isOpen onOpenChange={props.onOpenChange}>
      <AlertDialog.Trigger tabIndex={0} className="sr-only">
        Open
      </AlertDialog.Trigger>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Heading>{props.header}</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>{props.body}</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary" onClick={props.onCancel}>
                {props.cancel}
              </Button>
              <Button variant="primary" onClick={props.onConfirm}>
                {props.confirm}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
