import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../constant";

const HotelContext = createContext();

function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");

  const room = JSON.parse(searchParams.get("options"))?.room;

  const { isLoading, data: hotels } = useFetch(
    BASE_URL+'/hotels',
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}
export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}
