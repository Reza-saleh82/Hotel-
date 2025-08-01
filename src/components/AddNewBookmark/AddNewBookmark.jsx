import axios from "axios";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useBookmarks } from "../context/BokkmarksProvider";
import toast from "react-hot-toast";

function AddNewBookmark() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { createdBookmark } = useBookmarks();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newObj = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };

    createdBookmark(newObj);
    navigate("/bookmark");
    toast.success("added bookmark");
  };
  useEffect(() => {
    if (!lat || !lng) return null;

    const fetchData = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );

        console.log(data.countryCode);

        console.log({ data });

        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        console.log(error);
        setError(error.response.data.description);
      }
      setLoading(false);
    };
    fetchData();
  }, [lat, lng]);
  return (
    <div>
      <h2>Bookmark New Location</h2>
      {!loading ? (
        !error ? (
          <form className="form" onSubmit={handleSubmit}>
            <div className="formControl">
              <label htmlFor="cityName">CityName</label>
              <input
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                type="text"
                name="cityName"
                id="cityName"
              />
            </div>
            <div className="formControl">
              <label htmlFor="country">Country</label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                name="country"
                id="country"
              />
              <ReactCountryFlag
                className="flag"
                svg
                countryCode={countryCode}
              />
            </div>
            <div className="buttons">
              <button
                className="btn btn--back"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                &larr; Back
              </button>
              <button className="btn btn--primary">Add</button>
            </div>
          </form>
        ) : (
          <p>{error}</p>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
}
export default AddNewBookmark;
