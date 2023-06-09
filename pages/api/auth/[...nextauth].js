import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUserIdByEmail, createUser } from "../user";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      try {
        console.log("callbacks session", session);
        if (session?.user?.email) {
          const { email } = session.user;
          let userId;
          const findUserResult = await getUserIdByEmail(email);

          // If no user is found in the db, create one
          if (findUserResult === 0) {
            const createUserResult = await createUser(email);
            userId = createUserResult;
          } else {
            userId = findUserResult;
          }
          session.user = {
            ...session.user,
            userId,
          };
        }
        return Promise.resolve(session);
      } catch (error) {
        console.log("callbacks error", error);
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
