import MessageCard from "../../components/MessageCard";
import connectDB from "../../config/database";
import { Message } from "../../models/Message";
import { IMessage } from "./../../types";
import { getSessionUser } from "../../utils/getSessionUser";

const MessagePage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser?.user || !sessionUser.userId) {
    throw new Error("No seesion user found");
  }

  const { userId } = sessionUser;

  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

    const unReadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

    const allMessages = [...unReadMessages, ...readMessages];


  return (

    <section className='bg-blue-50'>
    <div className='container m-auto py-24 max-w-6xl'>
      <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
        <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

        <div className='space-y-4'>
          {allMessages.length === 0 ? (
            <p>You have no messages</p>
          ) : (
            allMessages.map((message) => (
                <MessageCard key={message._id?.toString()} message={message as unknown as IMessage} />
            ))
          )}
        </div>
      </div>
    </div>
  </section>
  );
};

export default MessagePage;
