import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export type ConfirmAlertProps = {
  triggerText: string;
  triggerTestId: string;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  TriggerButtonProps?: Omit<React.ComponentProps<typeof Button>, "data-testid">;
  disabled?: boolean;
};

export const ConfirmAlert = ({
  triggerText,
  triggerTestId,
  title = "Are you sure?",
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  onCancel,
  TriggerButtonProps,
  disabled,
}: ConfirmAlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          {...{
            variant: "destructive",
            "data-testid": triggerTestId,
            ...TriggerButtonProps,
          }}
        >
          {triggerText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={disabled} onClick={onCancel}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction disabled={disabled} onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
