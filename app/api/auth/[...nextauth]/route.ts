import { getAuthOptions } from '../../../../utils/authOptions';
import NextAuth from 'next-auth/next';

const authOptions = getAuthOptions();
if (typeof authOptions === 'string') {
    throw new Error(authOptions); // Log or handle the error appropriately
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}

// export default handler;
