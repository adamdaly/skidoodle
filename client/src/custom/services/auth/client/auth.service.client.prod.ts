import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  fetchAuthSession,
  getCurrentUser,
} from "aws-amplify/auth";

import { AuthServiceClientBase } from "../auth.service.base";

import {
  SignUpArgs,
  ConfirmationRegistrationArgs,
  SignInArgs,
} from "../auth.service.types";

export default class AuthServiceClientProd implements AuthServiceClientBase {
  async signUp({ username, password }: SignUpArgs) {
    return await signUp({ username, password });
  }

  async confirmSignUp({
    username,
    confirmationCode,
  }: ConfirmationRegistrationArgs) {
    return await confirmSignUp({ username, confirmationCode });
  }

  async signIn({ username, password }: SignInArgs) {
    return await signIn({ username, password });
  }

  async signOut() {
    return await signOut();
  }

  async fetchAuthSession() {
    return await fetchAuthSession();
  }

  getCurrentUser() {
    return getCurrentUser();
  }
}
