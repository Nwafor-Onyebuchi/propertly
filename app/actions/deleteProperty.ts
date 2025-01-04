'use server'

import connectDB from "../../config/database"
import cloudinary from "../../config/cloudinary"
import Property from "../../models/Property"
import {getSessionUser} from '../../utils/getSessionUser'
import { revalidatePath } from "next/cache"

async function deleteProperty (propertyId: string) {
    await connectDB()
    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required')
    }

    const { userId }  = sessionUser

    const property = await Property.findById(propertyId)

    if(!property) {
        throw new Error('Property not found')
    }

    if(property.owner.toString() !== userId) {
        throw new Error('Unauthorized')
    }

    const publicIds = property.images.map((imageUrl:string)=>{
        const parts = imageUrl.split('/')
        const imageName = parts.at(-1)
        if(!imageName) {
            throw new Error('images not found')
        } 
        return imageName.split('.').at(0)
        
    })

    //  Delete images from cloudinary
    if(publicIds.length > 0) {
        for(const publicId of publicIds){
            await cloudinary.uploader.destroy('propertly/' + publicId)
        }
    }

    await property.deleteOne()

    revalidatePath('/', "layout")

}

export default deleteProperty