import PropertyCard from "../../../components/PropertyCard";
import connectDB from "../../../config/database";
import { User } from "../../../models/User";
import { getSessionUser } from "../../../utils/getSessionUser"


const SavedPropertyPage = async () => {
    await connectDB()

    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is  required')
    }

    const {userId} = sessionUser

    const {bookmarks} = await User.findById(userId).populate('bookmarks')

    return <section className="px-4 py-6">
        <div className="container lg:container m-auto px-4 py-6">
            <h1 className="text-2xl mb-4">Save Properties</h1>
            {bookmarks.length === 0 ? (<p>No saved properties</p>):(<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {bookmarks.map((bookmark:any)=> (
                    <PropertyCard property={bookmark} key={bookmark._id}/>
                ))}
            </div>)}
        </div>
    </section>
}
 
export default SavedPropertyPage;