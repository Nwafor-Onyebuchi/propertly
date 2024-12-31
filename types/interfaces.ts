import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
    email: string;
    username: string;
    image?: string;
    bookmarks: ObjectId[]; // Array of ObjectIds referencing the 'Properties' collection
    createdAt?: Date; // Automatically added by timestamps
    updatedAt?: Date; // Automatically added by timestamps
}

   
export interface IQueryType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $or?: any[],
    type?: RegExp

}

export interface SearchParams {
    location?: string; 
    propertyType?: string; 
}

export interface Props {
    searchParams: SearchParams;
}
