import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
    email: string;
    username: string;
    image?: string;
    bookmarks: ObjectId[]; // Array of ObjectIds referencing the 'Properties' collection
    createdAt?: Date; // Automatically added by timestamps
    updatedAt?: Date; // Automatically added by timestamps
}
