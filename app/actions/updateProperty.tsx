'use server'
import connectDB from "../../config/database";
import Property from "../../models/Property";
import { IProperty } from "../../types";
import { getSessionUser } from "../../utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updatedProperty = async(propertyId: string, formData: any) => {

    connectDB();

  const sessionUser = await getSessionUser();
  // console.log(sessionUser)

  if (!sessionUser?.user || !sessionUser.userId) {
    throw new Error("No seesion user found");
  }

  const { userId } = sessionUser;

  const property:IProperty | null = await Property.findOne({_id:propertyId});
  if (!property) {
    throw new Error('Property not found');
  }

  if(!property) {
    throw new Error('Property not found')
  }

  if(property.owner && property.owner.toString() !== userId) {
    throw new Error('You are not authorized to update this property')
  }

  const propertyDate:IProperty = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: formData.getAll("amenities"),
    rates: {
      weekly: formData.get("rates.weekly"),
      nightly: formData.get("rates.nightly"),
      monthly: formData.get("rates.monthly"),
    },

    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyDate, {new:true});

  revalidatePath('/','layout');

  redirect(`/properties/${updatedProperty._id}`);


}