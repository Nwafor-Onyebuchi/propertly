'use client'
import { useState, createContext, useContext, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import  getUnreadMessage  from "../app/actions/getUnreadMessageCount";


const GlobalContext = createContext({});

export function GlobalProvider({children}: { children: ReactNode }) {

    const [unreadMessageCount, setUnreadMessageCount] = useState(0)

    const {data: session} = useSession()

    useEffect(() => {
        if(session) {
            getUnreadMessage().then(({count}: {count: number}) => {
                setUnreadMessageCount(count)
            })
        }
    }, [session])
    

    return (
        <GlobalContext.Provider value={{unreadMessageCount, setUnreadMessageCount}}>
            {children}
        </GlobalContext.Provider>
    )
}


export function useGlobalContext() {
    return useContext(GlobalContext)
}   