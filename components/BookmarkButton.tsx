"use client";

import { bookMarProperty } from "@/app/actions/bookmarkProperty";
import { checkBookmarkStatus } from "@/app/actions/checkBookmarkStatus";
import { PropProp } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }: PropProp) => {
    const {data:session} = useSession()
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const userId = session?.user?.id

    

    useEffect(()=>{
         async function checkStatus ()  {
            if(!userId) {
                setIsLoading(false)
                return
            }
    
            try {
               const status = await checkBookmarkStatus(property._id)
               setIsBookmarked(status.isBookMarked)
               setIsLoading(false)
            } catch (error) {
                toast.error(`${error}`)
                setIsLoading(false)
            }
        }

        // checkStatus()
    },[property._id, userId])
  
    const handleBookmarks = async() => {
        if(!userId) {
            toast.error('Sign in to bookmark property')
            return
        }
        try {
       
            const bookmark = await bookMarProperty(property)
            toast.success(bookmark.message)
        } catch (error) {
            toast.error(`${error}`)
        }
    }
  return isBookmarked? (
    
    <button className="bg-red-500 hover:bg-rd-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center" onClick={handleBookmarks}>
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ):(
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center" onClick={handleBookmarks}>
      <FaBookmark className="mr-2" /> Bookmark {property.name}
    </button>
  );
};

export default BookmarkButton;
