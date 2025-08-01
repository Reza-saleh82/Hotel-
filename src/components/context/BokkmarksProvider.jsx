import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../constant";
import { act } from "react";

const BookmarksContext = createContext();

function BookMarksProvider({ children }) {
  const initialState = {
    bookmarkList: [],
    loading: false,
    error: null,
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "pending": {
        return { ...state, loading: true };
      }
      case "success-getList": {
        return { loading: false, error: null, bookmarkList: payload };
      }
      case "success-created": {
        return {
          loading: false,
          error: null,
          bookmarkList: [...state.bookmarkList, payload],
        };
      }
      case "reject": {
        return { loading: false, error: payload, bookmarkList: [] };
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, data: bookmarks } = useFetch(BASE_URL + "/bookmarks");

  const createdBookmark = async (newObj) => {
    dispatch({ type: "pending" });
    try {
      const { data } = await axios.post(BASE_URL + "/bookmarks", newObj);
      console.log(data);
      dispatch({ type: "success-created", payload: data });
    } catch (error) {
      dispatch({ type: "reject", payload: "error" });
    }
  };

  useEffect(() => {
    if (isLoading) {
      dispatch({ type: "pending" });
    }
    if (!!bookmarks.length) {
      dispatch({ type: "success-getList", payload: bookmarks });
    }
    if (!bookmarks.length && !isLoading) {
      dispatch({ type: "reject", payload: "error" });
    }
  }, [isLoading, bookmarks]);

  return (
    <BookmarksContext.Provider
      value={{
        isLoading: state.loading,
        bookmarks: state.bookmarkList,
        createdBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
export default BookMarksProvider;

export function useBookmarks() {
  return useContext(BookmarksContext);
}
