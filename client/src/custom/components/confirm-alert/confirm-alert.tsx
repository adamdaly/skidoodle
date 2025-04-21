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
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  TriggerButtonProps?: React.ComponentProps<typeof Button>;
};

export const ConfirmAlert = ({
  triggerText,
  title = "Are you sure?",
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  onCancel,
  TriggerButtonProps,
}: ConfirmAlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...{ variant: "destructive", ...TriggerButtonProps }}>
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
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
