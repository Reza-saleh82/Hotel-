import { Outlet } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import Loader from "../Loader/Loader";
import Map from "../Map/Map";

function AppLayout() {
  const { hotels ,isLoading} = useHotels();

  // const [searchParams, setSearchParams] = useSearchParams();
  // const destination = searchParams.get("destination");
  // const room = JSON.parse(searchParams.get("options"))?.room;

  // const { isLoading, data: hotels } = useFetch(
  //   "http://localhost:5000/hotels",
  //   `q=${destination || ""}&accommodates_gte=${room || 1}`
  // );

  return (
    
      <div className="appLayout">
        {isLoading && !hotels.length && hotels ? (
          <Loader />
        ) : (
          <>
            <div className="sidebar">
              <Outlet />
            </div>
            <Map markerItems={hotels} />
          </>
        )}
      </div>

  );
}
export default AppLayout;
