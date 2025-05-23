export type SignUpArgs = {
  username: string;
  password: string;
};

export type ConfirmationRegistrationArgs = {
  username: string;
  confirmationCode: string;
};

export type SignInArgs = {
  username: string;
  password: string;
};
