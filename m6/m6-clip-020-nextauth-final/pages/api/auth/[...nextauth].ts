import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma/prisma";

export const authOptions: NextAuthOptions = {
  pages: {
    //signIn: "/auth/signin",
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Pluralsight Demo App",
      // `credentials` is used to generate a form on the sign in id.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: { label: "Password", type: "password" },
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

          if (attendee) {
            //userObject.email = attendee.Email ?? "";



            userObject.user = {
              email: attendee.email ?? "",
              id: attendee.id,
            };

            return userObject;
          } else {
            return null;
          }
        }
        const userObject = await goAsync();
        console.log("authorize: userObject:", userObject);
        return userObject;
      },
    }),
  ],

  // this helped: https://stackoverflow.com/questions/64576733/where-and-how-to-change-session-user-object-after-signing-in/64595973#64595973
  callbacks: {
    jwt: async function ({ token, user }) {
      // invoked before session function
      user && (token.email = user.email);
      const newToken = { ...token, ...user };
      return newToken;
    },
    session: async function ({ session, token }) {
      const _session = { ...session, ...token };
      return _session;
    },
  },
};

export default NextAuth(authOptions);
