import { Toaster } from "react-hot-toast";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";

// import Hotels from "./components/Hotels/Hotels";
import LocationList from "./components/LocationList/LocationList";
import Header from "./components/header/Header";
import HotelsProvider from "./components/context/HotelsProvider";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import BookMarksProvider from "./components/context/BokkmarksProvider";
import Bookmark from "./components/Bookmark/Bookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import Login from "./components/Login/Login";
import CheckLogin from "./components/CheckLogin/CheckLogin";

function App() {
  return (
    <>
      <Toaster />
      <Header />
      <HotelsProvider>
        <BookMarksProvider>
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmark" element={<BookmarkLayout />}>
              <Route index element={<CheckLogin>
                <Bookmark/>
              </CheckLogin>} />
              <Route path="add" element={<AddNewBookmark/>} />
            </Route>
            <Route path="/login" element={<Login />} />

          </Routes>
        </BookMarksProvider>
      </HotelsProvider>
    </>
  );
}

export default App;
