import NextAuth, { NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import CredentialsProvider from "next-auth/providers/credentials";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import {
  COGNITO_CLIENT_ID,
  COGNITO_CLIENT_SECRET,
  COGNITO_ISSUER,
  COGNITO_USER_POOL_ID,
} from "@/custom/constants";

// export const authOptions: NextAuthOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     CognitoProvider({
//       clientId: COGNITO_CLIENT_ID ?? "",
//       clientSecret: COGNITO_CLIENT_SECRET ?? "",
//       issuer: COGNITO_ISSUER,
//     }),
//   ],
//   pages: {
//     signIn: "/sign-in",
//   },
//   debug: true, // Enable debug logs for troubleshooting
// };

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Cognito",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const userPool = new CognitoUserPool({
          UserPoolId: COGNITO_USER_POOL_ID ?? "",
          ClientId: COGNITO_CLIENT_ID ?? "",
        });

        const cognitoUser = new CognitoUser({
          Username: credentials.username,
          Pool: userPool,
        });

        const authenticationDetails = new AuthenticationDetails({
          Username: credentials.username,
          Password: credentials.password,
        });

        try {
          const authenticationResult = await new Promise<CognitoUserSession>(
            (resolve, reject) => {
              cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result) => resolve(result),
                onFailure: (err) => reject(err),
                newPasswordRequired: (userAttributes) => {
                  // Handle the new password challenge
                  reject(new Error("New password required"));
                },
              });
            }
          );

          // Extract tokens from the authentication result
          const idToken = authenticationResult.getIdToken().getJwtToken();
          const accessToken = authenticationResult
            .getAccessToken()
            .getJwtToken();
          const refreshToken = authenticationResult
            .getRefreshToken()
            .getToken();

          // Return user object for NextAuth.js session
          return {
            id: credentials.username,
            email: credentials.username,
            accessToken,
            idToken,
            refreshToken,
          };
        } catch (error) {
          throw new Error("Authentication failed: " + error?.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add Cognito tokens to the JWT
        token.accessToken = user.accessToken;
        token.idToken = user.idToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Add Cognito tokens to the session
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  debug: true, // Enable debug logs for troubleshooting
};

export const auth = NextAuth(authOptions);

export { auth as GET, auth as POST };
