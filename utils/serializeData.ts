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
  export const serializeMongoseObject = (data: ObjectId[]) => {
    if (!data || !Array.isArray(data)) return [];

    return data.map(el=>el.toString())
  };

  