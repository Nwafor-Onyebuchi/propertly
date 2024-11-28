/* eslint-disable @typescript-eslint/no-unused-vars */
import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions, } from 'next-auth';
import { IGoogleUser } from '@/types';

const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID;
const GOOGLE_AUTH_SECRET = process.env.GOOGLE_AUTH_SECRET;

export const getAuthOptions = (): AuthOptions | string => {
    if (!GOOGLE_AUTH_CLIENT_ID || !GOOGLE_AUTH_SECRET) {
        return 'Google client ID or secret not defined';
    }

    const authOptions: AuthOptions = {
        providers: [
            GoogleProvider({
                clientId: GOOGLE_AUTH_CLIENT_ID,
                clientSecret: GOOGLE_AUTH_SECRET,
                authorization: {
                    params: {
                        prompt: 'consent',
                        access_type: 'offline',
                        response_type: 'code',
                    },
                },
            }),
        ],
        callbacks: {
            async signIn({
                user,
                account,
                profile,
                email,
                credentials,
            }: IGoogleUser) {
                // Example implementation:
                // Connect to the database and validate user existence
                return true; // Return true for successful sign-in
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async session({ session }: { session: any }) {
                // Example implementation:
                // Modify the session object if needed
                return session;
            },
        },
    };

    return authOptions;
};
