import React, { useState } from "react";

function useGeoLocation() {
  const [loading, setLoading] = useState(false);
  const [geoPosition, setGeoPosition] = useState({});
  const [error, setError] = useState('');

  const getGeoLocation=()=>{
    if(!navigator.geolocation) {
     return setError('not support')
    }
    setLoading(true)
    navigator.geolocation.getCurrentPosition((pos)=>{
        setGeoPosition({
            lat:pos.coords.latitude,
            lng:pos.coords.longitude,
        })
        setLoading(false)
    },(error)=>{
        setError(error.message)
        setLoading(false)
    })
  }

  return {loading,error,getGeoLocation,geoPosition}
}

export default useGeoLocation;
