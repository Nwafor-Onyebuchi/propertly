// // types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface User {
        _id?: string; // Add `_id` property to the User type
    }

    interface Session {
        user: {
            id: string; // Include `_id` in the session's user object
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}
