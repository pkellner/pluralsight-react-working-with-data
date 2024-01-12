import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma/prisma";

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

  callbacks: {
    jwt: async function ({ token, user }) {
      user && (token.email = user.email);
      return {...token, ...user};
    },
    session: async function ({ session, token }) {
      return {...session, ...token};
    },
  },
};

export default NextAuth(authOptions);
