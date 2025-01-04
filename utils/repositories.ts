import { IUser } from '../types/interfaces';
import {User} from '../models/User'
// import { ObjectId } from 'mongoose';

export async function getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).lean<IUser>();
}

export async function getUserById(id: string): Promise<IUser | null> {
    return await User.findOne({ id }).lean<IUser>();
}
