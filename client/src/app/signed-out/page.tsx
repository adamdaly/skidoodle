import Link from "next/link";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignedOutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <LogOut className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Signed Out</CardTitle>
          <CardDescription>
            You have been successfully signed out of your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          <p>
            Thank you for using our service. For security reasons, we&apos;ve
            ended your session.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button asChild size="lg" className="px-8" data-testid="sign-in">
            <Link href="/sign-in">Sign In Again</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
