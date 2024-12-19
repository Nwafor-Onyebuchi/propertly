import EditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const EditPropertyPage = async({params}: {params: { id: string }}) => {

    await connectDB()
    const { id } = await params
    const property = await Property.findById(id)

    if(!property) {
        return (
            <div className="text-center text-2xl font-bold mt-10">
                <h1>Property Not Found</h1>
            </div>
        )
    }

    return ( <section className="bg-blue-50">
        <div className="container m-auto max-w-2xl py-24">
            <div className="bg-white px-6 py-8 shadow-md rounded-md border m-4 md:m-0">
            
                <EditForm property={property}/>
            </div>
        </div>
    </section> );
}
 
export default EditPropertyPage;