import { useCallback, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RHFTextField } from "@/custom/components/inputs/text-field";
import { useScene } from "../../../context";

const createInviteSchema = () =>
  z.object({
    email: z.string().email().trim(),
  });

type InviteSchema = z.infer<ReturnType<typeof createInviteSchema>>;

const useInvite = () => {
  const { createParentSession, parentSessionState, createInvite, sessions } =
    useScene();
  const [open, setOpen] = useState(false);

  const sessionid =
    parentSessionState.data?.createParentSession.parentSessionId;

  const openDialog = useCallback(() => {
    if (!sessionid) {
      createParentSession();
    }
    setOpen(true);
  }, [sessionid]);

  const closeDialog = useCallback(() => {}, []);

  const schema = useRef(createInviteSchema());

  const form = useForm<InviteSchema>({
    resolver: zodResolver(schema.current),
    defaultValues: {
      email: "adam_daly@hotmail.co.uk",
    },
  });

  const submit = useCallback(async (values: InviteSchema) => {
    try {
      await createInvite({
        variables: { email: values.email },
      });
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return {
    isLoading: parentSessionState.loading,
    open,
    setOpen,
    openDialog,
    closeDialog,
    form,
    submit,
    sessions,
  };
};

export const Invite = () => {
  const {
    isLoading,
    open,
    setOpen,
    openDialog,
    closeDialog,
    form,
    submit,
    sessions,
  } = useInvite();

  const onSubmit = useMemo(() => form.handleSubmit(submit), [form, submit]);

  return (
    <FormProvider {...form}>
      <Dialog
        {...{
          open,
          onOpenChange: setOpen,
        }}
      >
        <DialogTrigger asChild>
          <div className="relative">
            {sessions && sessions.length > 0 && (
              <div className="absolute top-[-2] right-[-2] w-2 h-2 rounded-full bg-red-700" />
            )}
            <Button
              {...{
                variant: "outline",
                className: "cursor-pointer",
                size: "icon",
                onClick: openDialog,
                "data-testid": "scene-controls-invite",
              }}
            >
              <UserPlus />
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-4">
            <DialogTitle>Invite another person</DialogTitle>
            <DialogDescription>Enter an email</DialogDescription>
          </DialogHeader>
          {isLoading && <div>Loading</div>}
          {!isLoading && (
            <>
              <form {...{ onSubmit }}>
                <div className="mb-4">
                  <RHFTextField
                    {...{
                      control: form.control,
                      name: "email",
                      label: "Email",
                      "data-testid": "input-scene-invite",
                    }}
                  />
                </div>
                <DialogFooter>
                  <Button
                    data-testid="cta-scene-invite-cancel"
                    type="button"
                    variant="outline"
                    onClick={closeDialog}
                  >
                    Cancel
                  </Button>
                  <Button data-testid="cta-scene-invite-submit" type="submit">
                    Invite
                  </Button>
                </DialogFooter>
              </form>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Users</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions
                    .values()
                    .drop(1)
                    .toArray()
                    ?.map((session) => (
                      <TableRow key={session.sessionid}>
                        <TableCell className="font-medium">
                          {session.email}
                        </TableCell>
                        <TableCell className="text-right">Remove</TableCell>
                      </TableRow>
                    ))}
                  {sessions.length === 1 && (
                    <TableRow>
                      <TableCell colSpan={2}>No users yet</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
