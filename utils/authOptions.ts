/* eslint-disable @typescript-eslint/no-unused-vars */
import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';
import { IGoogleUser } from '@/types';
import connectDB from '@/config/database';
import { User } from '@/models/User'; 

const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID;
const GOOGLE_AUTH_SECRET = process.env.GOOGLE_AUTH_SECRET;

export const getAuthOptions = (): AuthOptions | string => {
    if (!GOOGLE_AUTH_CLIENT_ID || !GOOGLE_AUTH_SECRET) {
        throw new Error('Google client ID or secret not defined') 
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
                // Connect to the database and validate user existence
                await connectDB();
                const existingUser = await User.findOne({ email: profile?.email });
                if (!existingUser) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name,
                        image: user?.image
                    }) 
                }
                return true; // Return true for successful sign-in
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async session({ session }: { session: any }) {
                // Modify the session object if needed
               const user = await User.findOne({email: session.user.email})
               session.user.id = user._id.toString()
              
                return session;
            },
        },
    };

    return authOptions;
};


