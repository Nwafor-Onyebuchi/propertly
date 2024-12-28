import {  PropProp } from "@/types";
import { FaBookmark } from "react-icons/fa";

const BookmarkButton = ({property}: PropProp) => {
    return ( 
        <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            >
              <FaBookmark className="mr-2"/> Bookmark {property.name}
            </button>
    );
}
 
export default BookmarkButton;