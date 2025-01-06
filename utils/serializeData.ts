import { ObjectId } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeMongoArray = (data: any[]) => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.map(({ _id, owner, ...rest }) => ({
      ...rest,
      id: _id.toString(), // Convert _id to a string
      owner: owner.toString()
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const serializeMongoArrayMessages = (data: any[]) => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.map(({ _id, recipient, ...rest }) => ({
      ...rest,
      id: _id.toString(), // Convert _id to a string
      recipient: recipient.toString(),
      sender: {
        id: rest.sender._id.toString(),
        username: rest.sender.username
      },
      property: {
        id: rest.property._id.toString(),
        name: rest.property.name
      }
    }));
  };


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const serializeMongoseObject = (data: ObjectId[]) => {
    if (!data || !Array.isArray(data)) return [];

    return data.map(el=>el.toString())
  };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const serializeMongoObject = (data: any) => {
    if (!data || typeof data !== "object") return null;
  
    const { _id, owner, ...rest } = data;
  
    return {
      ...rest,
      id: _id?.toString(), // Convert _id to a string if it exists
      owner: owner?.toString(), // Convert owner to a string if it exists
    };
  };
  

  