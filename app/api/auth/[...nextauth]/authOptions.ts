/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import type { StrapiErrorT } from '@/types/StrapiError';
import type { StrapiLoginResponseT } from '@/types/User';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sing-in",
  },
  providers: [
    //...
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials email and password',
      credentials: {
        identifier: {
          label: 'Email',
          type: 'text',
          placeholder: "example@mail.com",
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const strapiResponse = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`,
            {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({
                identifier: credentials!.identifier,
                password: credentials!.password,
              }),
            }
          );
      
          if (!strapiResponse.ok) {
            // return error to signIn callback
            const contentType = strapiResponse.headers.get('content-type');
            if (contentType === 'application/json; charset=utf-8') {
              const data: StrapiErrorT = await strapiResponse.json();
              throw new Error(data.error.message);
            } else {
              throw new Error(strapiResponse.statusText);
            }
          }
      
          // success
          const data: StrapiLoginResponseT = await strapiResponse.json();

          return {
            name: data.user.username,
            email: data.user.email,
            id: data.user.id.toString(),
            strapiUserId: data.user.id,
            blocked: data.user.blocked,
            strapiToken: data.jwt,
            report: data.user.report,
          };
        } catch (error) {
          // Catch errors in try but also f.e. connection fails
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, account, user, session }) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (trigger === 'update' && session?.username && (session?.report !== undefined)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        token.name = session.username;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        token.report = session.report
      }

      if (account) {
        if (account.provider === 'credentials') {
          // for credentials
          // name and email are taken care of by next-auth or authorize
          token.strapiToken = user.strapiToken;
          token.strapiUserId = user.strapiUserId;
          token.provider = account.provider;
          token.blocked = user.blocked;
          token.report = user.report
        }
      }
      return token;
    },
    async session({ token, session }) {
      session.strapiToken = token.strapiToken;
      session.provider = token.provider;
      session.user.strapiUserId = token.strapiUserId;
      session.user.blocked = token.blocked;
      session.user.report = token.report;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};