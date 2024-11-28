import { ReactNode } from "react";

import {  Types } from "mongoose";

export type IImage = string[]

export interface IProperty {
  _id?:  Types.ObjectId | string;
  owner?: Types.ObjectId | string;
  _v?: number | undefined,
  name?: string;
  type?: string;
  description?: string;
  location?: {
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
  };
  beds?: number;
  baths?: number;
  square_feet?: number;
  amenities?: string[];
  rates?: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
  seller_info?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  images: IImage | string;
  is_featured?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}


export interface PropProp {
    children?: ReactNode,
    property: IProperty
}

export interface HeaderImageProp {
    image: string
}
  