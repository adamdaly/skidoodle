import {
  AuthSession,
  ConfirmSignUpOutput,
  SignInOutput,
  SignUpOutput,
  GetCurrentUserOutput,
} from "aws-amplify/auth";
import {
  SignUpArgs,
  ConfirmationRegistrationArgs,
  SignInArgs,
} from "./auth.service.types";

export abstract class AuthServiceClientBase {
  abstract signUp(args: SignUpArgs): Promise<SignUpOutput>;
  abstract confirmSignUp(
    args: ConfirmationRegistrationArgs
  ): Promise<ConfirmSignUpOutput>;
  abstract signIn(args: SignInArgs): Promise<SignInOutput>;
  abstract signOut(): Promise<void>;
  abstract fetchAuthSession(): Promise<AuthSession>;
  abstract getCurrentUser(): Promise<GetCurrentUserOutput>;
}

export abstract class AuthServiceServerBase {
  abstract fetchAuthSession(): Promise<AuthSession>;
  abstract getIsAuthenticated(): Promise<boolean>;
}
