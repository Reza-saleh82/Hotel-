import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useBookmarks } from "../context/BokkmarksProvider";

function Bookmark() {
  const { isLoading, bookmarks } = useBookmarks();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  // if (isLoading) return <Loader />;
  // if (!bookmarks.length) return <p>there is no bookmarked location</p>;

  return (
    <div>
      <h2>BookmarkList</h2>

      {isLoading ? (
        <Loader />
      ) : !bookmarks.length ? (
        <p>there is no bookmarked location</p>
      ) : (
        <div className="bookmarkList">
          {bookmarks.map((item) => {
            return (
              <Link
                key={item.id}
                to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              >
                <div
                  className={`bookmarkItem
                `}
                >
                  <div>
                    <ReactCountryFlag svg countryCode={item.countryCode} />
                    &nbsp; <strong>{item.cityName}</strong> &nbsp;
                    <span>{item.country}</span>
                  </div>
                  <button onClick={(e) => handleDelete(e, item.id)}>
                    <HiTrash className="trash" />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Bookmark;
