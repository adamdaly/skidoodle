"use client";
import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { deleteAnimation } from "@/custom/api/animation.api";
import { ConfirmAlert } from "@/custom/components/confirm-alert";
import {
  NetworkStatus,
  useNetworkStatus,
} from "@/custom/hooks/use-network-status";

export const useAnimationDelete = (id: number) => {
  const { status, setInFlight, setError } = useNetworkStatus();
  const router = useRouter();

  const onConfirm = useCallback(async () => {
    try {
      setInFlight();
      await deleteAnimation(id);
      router.push("/dashboard");
    } catch {
      setError();
    }
  }, []);

  return {
    status,
    onConfirm,
  } as const;
};

export type AnimationDeleteProps = {
  id: number;
};

export const AnimationDelete = memo(({ id }: AnimationDeleteProps) => {
  const { status, onConfirm } = useAnimationDelete(id);

  const disabled = status === NetworkStatus.INFLIGHT;
  return (
    <ConfirmAlert
      {...{
        triggerText: "Delete Animation",
        triggerTestId: "cta-animation-delete",
        TriggerButtonProps: {
          className: "ml-4",
        },
        description: "This animation will be permanently deleted!",
        onConfirm,
        onCancel: () => {},
        disabled,
      }}
    />
  );
});

AnimationDelete.displayName = "AnimationDelete";
