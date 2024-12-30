'use server'

import connectDB from "@/config/database"
import { getSessionUser } from "@/utils/getSessionUser"
import { getUserById } from "@/utils/repositories"
import { serializeMongoseObject } from "@/utils/serializeData"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkBookmarkStatus = async (propertId: any) => {
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

    const doc = await serializeMongoseObject(user.bookmarks)
    const isBookMarked = doc.includes(propertId)

    return { isBookMarked }

}