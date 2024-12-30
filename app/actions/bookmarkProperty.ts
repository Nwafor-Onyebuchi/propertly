'use server'

import connectDB from "@/config/database"
import { User } from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser"
import { getUserById } from "@/utils/repositories"
import { serializeMongoseObject } from "@/utils/serializeData"
import { revalidatePath } from "next/cache"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bookMarProperty = async (property: any) => {
    await connectDB()

    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is  required')
    }

    const {userId} = sessionUser

    const user = await getUserById(userId)

    // console.log(user, property)

    if(!user) {
        throw new Error('User not found')
    }

    const doc = await serializeMongoseObject(user.bookmarks)
    const isBookMarked = doc.includes(property._id)

    let message;

    if(isBookMarked){
        await User.updateOne({_id: userId}, {isBookmarked: false, $pull: {bookmarks: property._id}})
        message = 'Bookmark removed'
    } else {
        await User.updateOne({_id: userId}, {isBookmarked: true, $push: {bookmarks: property._id}})
        message = 'Bookmark added'
    }

    revalidatePath('/properties/saved', 'page')

    return {
        message, isBookMarked
    }


}