import Link from "next/link";
import PropertyCard from "./PropertyCard";
import Property from "@/models/Property";
import connectDB from "@/config/database";
const Homeproperties = async() => {


    await connectDB()

    const recentProperties = await Property.find({}).sort({createdAt: -1}).limit(3)

    return ( 

    <>
    <section className='px-4 py-6'>
        <div className="container-xl lg:container m-auto px-6 py-6">
            <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                Recent Properties
            </h2>
            {recentProperties.length === 0 ? (
                <p>No properties found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recentProperties.map((property)=> (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            )}
        </div>
    </section>
    
    <section className="m-auto max-w-lg my-6 px-6 ">
            <Link href='/properties' className="block bg-black py-4 px-6 rounded-md hover:bg-gray-700 text-center text-white">View All properties</Link>
    </section>
    </>
);
}
 
export default Homeproperties;