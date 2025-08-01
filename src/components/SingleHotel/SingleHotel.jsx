import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelsProvider";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../constant";

function SingleHotel() {
  const { id } = useParams();

  const { isLoading: isLoadingCurrHotel, data: currentHotel } = useFetch(
    BASE_URL + `/hotels/${id}`
  );
   if (isLoadingCurrHotel || !currentHotel) return <Loader />;
  console.log({ currentHotel });
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}
export default SingleHotel;
