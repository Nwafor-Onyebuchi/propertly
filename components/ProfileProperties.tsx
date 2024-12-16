"use client";
import { useState } from "react";
import Image from "next/image";
import { IProperty } from "@/types";
import Link from "next/link";
import deleteProperty from "@/app/actions/deleteProperty";


const ProfilePproperties = ({ properties }) => {
  const [userProperties, setUserProperties] = useState(properties);

//   console.log('first', properties.length)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDelete = async (propertyId: any) => {
  const confirm = window.confirm('Are you sure about this?')

  if(!confirm) return

  await deleteProperty(propertyId)

  const updatedProps = userProperties.filter((property:IProperty)=>property.id !== propertyId)

  setUserProperties(updatedProps)
}

  return userProperties.map((property:IProperty, index:number)=>(
    <div key={index} className="mb-10">
      <Link href={`/properties/${property.id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          width={200}
          height={200}
          alt="Property 1"
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">Address: {`${property.location?.street}  ${property.location?.city}, ${property.location?.state}`}</p>
      </div>
      <div className="mt-2">
        <Link
          href="/add-property"
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button" onClick={()=>handleDelete(property.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))
 
};

export default ProfilePproperties;
