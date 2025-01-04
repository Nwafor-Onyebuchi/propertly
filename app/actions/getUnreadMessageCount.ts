'use server'

import connectDB from "../../config/database"
import { Message } from "../../models/Message"
import { getSessionUser } from "../../utils/getSessionUser"
import { getUserById } from "../../utils/repositories"


const getUnreadMessage = async () => {

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

    const count = await Message.countDocuments({recipient: userId, read: false})
    
    

    return {count}

}
 
export default getUnreadMessage;