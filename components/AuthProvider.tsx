'use client'
import { IReactNode } from "../types";
import {SessionProvider} from 'next-auth/react'

const AuthProvider:React.FC<IReactNode> = ({children}) => {
    return ( 
    <SessionProvider>
        {children}
    </SessionProvider> 
    );
}
 
export default AuthProvider;