import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '~/server/db';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  // TODO: Add SSO with Google
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   },
  // },
  user: {
    modelName: 'users',
    fields: {
      name: 'full_name',
      email: 'email_address',
    },
  },
  session: {
    modelName: 'user_sessions',
    fields: {
      userId: 'user_id',
    },
  },
});

/*

export const auth = betterAuth({
});
*/
