import { Outlet } from "react-router-dom";
import Loader from "../Loader/Loader";
import Map from "../Map/Map";
import { useBookmarks } from "../context/BokkmarksProvider";

function BookmarkLayout() {
  const { bookmarks ,isLoading} = useBookmarks();
console.log({bookmarks});

  return (
    
      <div className="appLayout">
        {isLoading && !bookmarks.length && bookmarks ? (
          <Loader />
        ) : (
          <>
            <div className="sidebar">
              <Outlet />
            </div>
            <Map markerItems={bookmarks} />
          </>
        )}
      </div>

  );
}
export default BookmarkLayout;
