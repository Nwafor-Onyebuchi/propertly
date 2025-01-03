"use server";

import connectDB from "@/config/database";
import {Message} from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function addMessage(previousState:any, formData: any) {
  connectDB();

  const sessionUser = await getSessionUser();
  // console.log(sessionUser)

  if (!sessionUser?.user || !sessionUser.userId) {
    throw new Error("No seesion user found");
  }

  const { userId } = sessionUser;

  const recipient = formData.get('recipient')

  if(userId===recipient) {
    return {error: 'You cannot send message to yourself'}
  }


  const message = new Message({
    sender: userId,
    recipient,
    property: formData.get('property'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('message'),
    name: formData.get('name'),
  })

  await message.save()

  return {submitted: true}
 
}
export default addMessage;
