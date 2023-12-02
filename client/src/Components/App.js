import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./Reused/GlobalStyles";

//Page imports
import LoginPage from "./routes/LoginPage/LoginPage";
import MyProfilePage from "./routes/MyProfilePage/MyProfilePage";
import GamesSearchPage from "./routes/GamesSearchPage/GamesSearchPage";
import FriendsPage from "./routes/FriendsPage/FriendsPage";
import OthersProfilePage from "./routes/OthersProfilePage/OthersProfilePage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route path="/games-search" element={<GamesSearchPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/others-profile/:targetUserId" element={<OthersProfilePage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
