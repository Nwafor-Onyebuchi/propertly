import { ReactNode } from "react";
import {  Types } from "mongoose";
import { User, Account, Profile } from 'next-auth';
import { ClientSafeProvider } from "next-auth/react";
import { IUser } from "./types/interfaces";
export type IImage = string[]

export interface IProperty {
  _id?:  Types.ObjectId | string;
  id?: string;
  owner?: Types.ObjectId | string;
  _v?: number | undefined,
  name?: string;
  type?: string;
  description?: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    nightly: number;
    weekly: number;
    monthly: number;
  };
  seller_info: {
    name?: string;
    email?: string;
    phone?: string;
  };
  images?: IImage | string;
  is_featured?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}


export interface PropProp {
    children?: ReactNode,
    property: IProperty
}

export interface IMessage {
  sender: IUser;
  recipient: Types.ObjectId | string;
  property: IProperty 
  email: string;
  phone: string;
  body: string;
  read: boolean;
  _v?: number,
  _id?: Types.ObjectId | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IMessageProp {
  children?: ReactNode,
  message: IMessage
}

export interface PropPropList {
  // children?: ReactNode,
  property: IProperty[]
}

export interface ErrorPageType {
  children?: ReactNode,
  error: Error
}

export interface IReactNode {
  children: ReactNode,

}

export interface HeaderImageProp {
    image: string
}

export interface IGoogleUser {
  user: User;
  account: Account | null;
  profile?: Profile;
  email?: { verificationRequest?: boolean };
  credentials?: Record<string, unknown>;
}

export type Providers = Record<string, ClientSafeProvider> | null;

export type SessionUser = {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  userId: string;
} | null;

export interface GlobalContextType {
  unreadMessageCount?: number;
  setUnreadMessageCount: (updateFn: (prev: number) => number) => void;
}

  