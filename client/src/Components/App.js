import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./Reused/GlobalStyles";

//Page imports
import LoginPage from "./routes/LoginPage/LoginPage";
import MyProfilePage from "./routes/MyProfilePage/MyProfilePage";
import GamesSearchPage from "./routes/GamesSearchPage/GamesSearchPage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route path="/games-search" element={<GamesSearchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
