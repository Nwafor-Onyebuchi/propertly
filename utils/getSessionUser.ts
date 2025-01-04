import { getServerSession } from 'next-auth/next';
import { getAuthOptions } from '../utils/authOptions';
import { SessionUser } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSessionUser = async (): Promise<SessionUser>=> {
   
        const authOptions = getAuthOptions(); 
        if (typeof authOptions === 'string') {
            throw new Error(authOptions); 
        }

        const session = await getServerSession(authOptions);

        if(!session?.user) {
            return null
        }
        return {
            user: session.user,
            userId: session.user.id
        } 
};
