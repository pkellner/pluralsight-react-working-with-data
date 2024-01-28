import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma/prisma";
import { randomBytes, randomUUID } from "node:crypto";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Pluralsight Demo App",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "Email",
        },
        password: { label: "Password: Not Needed For Demo", type: "password" },
      },
      async authorize(credentials, req) {
        async function goAsync() {
          let userObject: any = null;

          userObject = {
            user: credentials?.username,
          };

          const attendee = await prisma.attendee.findUnique({
            where: {
              email: credentials?.username,
            },
            select: {
              email: true,
              id: true,
            },
          });

          // no password check needed for demo. if attendee is null, then, login fails (meaning not found)

          if (attendee) {
            userObject.user = {
              email: attendee.email ?? "",
              id: attendee.id,
            };

            return userObject;
          } else {
            return null;
          }
        }
        return await goAsync();
      },
    }),
  ],
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },

  callbacks: {
    jwt: async function ({ token, user }) {
      user && (token.email = user.email);
      return { ...token, ...user };
    },
    session: async function ({ session, token }) {
      return { ...session, ...token };
    },
  },
};

export default NextAuth(authOptions);
