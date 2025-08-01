import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../hooks/useGeoLocation";

function Map({ markerItems }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapCenter, setMapCenter] = useState([20, 4]);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { error, geoPosition, loading, getGeoLocation } = useGeoLocation();
  useEffect(() => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
    }
  }, [lat, lng]);
  useEffect(() => {
    if (geoPosition.lat && geoPosition.lng) {
      setMapCenter([geoPosition.lat, geoPosition.lng]);
    }
  }, [geoPosition]);
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button className="getLocation" onClick={getGeoLocation}>
          {loading ? "loading" : "your location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DetectClick />

        <ChangeCenter position={mapCenter} />
        {markerItems.map((item) => (
          <Marker position={[item?.latitude, item?.longitude]}>
            <Popup>{item?.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
export default Map;

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);

  return null;
};

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => 
     navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
