'use server'

import connectDB from "@/config/database"
import { Message } from "@/models/Message"
import { getSessionUser } from "@/utils/getSessionUser"
import { getUserById } from "@/utils/repositories"
import { revalidatePath } from "next/cache"

const MarkAsRead = async (messageId: string) => {

    await connectDB()

    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is  required')
    }

    const {userId} = sessionUser

    const user = await getUserById(userId)


    if(!user) {
        throw new Error('User not found')
    }

    const message = await Message.findById(messageId)
    
    if(!message) {
        throw new Error('Message not found')
    }

    if(message.recipient.toString() !== userId) {
        throw new Error('You are not authorized to read this message')
    }

    message.read = !message.read

    revalidatePath('/messages', 'page')

    message.save()

    return message.read


    return ( <div>update message</div> );
}
 
export default MarkAsRead;