import { Switch } from "./_components/switch";
import { InviteProvider } from "./_components/context";

export default async function Page({
  params,
}: {
  params: Promise<{ inviteid: string }>;
}) {
  const p = await params;

  const inviteid = p.inviteid;
  if (!inviteid) {
    throw new Error(`Unknown Scene Id: ${inviteid}`);
  }

  return (
    <InviteProvider {...{ inviteid }}>
      <Switch />
    </InviteProvider>
  );
}
