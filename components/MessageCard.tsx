'use client'
import { useState } from "react";
import {toast} from 'react-toastify'


import {IMessageProp } from "@/types";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/globalContext";
import { GlobalContextType } from "@/types";

const MessageCard = ({message}: IMessageProp) => {

    const [read, setRead] = useState(message.read)
    // const [unReadCount, setUnReadCount] = useState(message.read)
    const [deleted, setDeleted] = useState(false)

    const {setUnreadMessageCount} = useGlobalContext() as GlobalContextType;

    const handleReadClick = async () => {
        const isRead = await markMessageAsRead(message._id?.toString() ?? "")

        setRead(isRead)
        setUnreadMessageCount((prev:number) => isRead ? prev - 1 : prev + 1)

        toast.success(`Message marked as ${isRead ? 'read' : 'unread'}`)
    }

    const handleDeleteClick = async () => {
        await deleteMessage(message._id?.toString() ?? "")
              setUnreadMessageCount((prev:number) => read ? prev - 1 : prev + 1)

        setDeleted(true)

        toast.success('Message successfully deleted!')
    }

    if(deleted) {
        return <p>Deleted message</p>
    }

    return ( <div className="relative bg-white p-4 rounded-md shadow-md border">
        {!read && (<div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">New</div>)}
        <h2 className="text-2xl mb-4 ">
            <span className="font font-bold">Property Inquiry:</span>{' '} {message.property?.name}
        </h2>
        <p className="text-gray-700">{message.body}</p>
        <ul className="mt-4">
            <li>
                <strong>Reply Email</strong> {' '}
                <a href={`mailto:${message.email}`} className="text-blue-500 underline">{message.email}</a>
            </li>
            <li>
                <strong>Reply Phone</strong> {' '}
                <a href={`tel:${message.phone}`} className="text-blue-500 underline">{message.phone}</a>
            </li>
            <li>
                <strong>Received</strong> {' '}
                {new Date(`${message.createdAt}`).toLocaleDateString()}
            </li>
        </ul>
        <button onClick={handleReadClick} className="mr-3 mt-4 bg-blue-500 text-white py-1 px-3 rounded-md">{read?'Mark as New':'Mark as Read'}</button>
        <button onClick={handleDeleteClick} className="mr-3 mt-4 bg-red-500 text-white py-1 px-3 rounded-md">Delete</button>
    </div> );
}
 
export default MessageCard;