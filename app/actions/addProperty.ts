"use server";

import connectDB from "../../config/database";
import Property from "../../models/Property";
import { getSessionUser } from "../../utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "../../config/cloudinary";
import { IProperty } from "../../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function addproperty(formData: any) {
  connectDB();

  const sessionUser = await getSessionUser();
  // console.log(sessionUser)

  if (!sessionUser?.user || !sessionUser.userId) {
    throw new Error("No seesion user found");
  }

  const { userId } = sessionUser;

  const amenities = formData.getAll("amenities");
  //       eslint-disable-next-line @typescript-eslint/no-explicit-any
  const images = formData
    .getAll("images")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((image: any) => image.name !== "");

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
    amenities,
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
    images:[]
  };

  const imageUrls = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageDate = Buffer.from(imageArray);

    const imageBase64 = imageDate.toString("base64"); // convert to base64

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "propertly",
        }
      );
      
      imageUrls.push(result.secure_url);
  }

  propertyDate.images = imageUrls
   

  const newproperty = new Property(propertyDate);

  await newproperty.save();

  revalidatePath("/", "layout");

  redirect(`/properties/${newproperty._id}`);

 
}
export default addproperty;
