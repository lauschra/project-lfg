import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./Reused/GlobalStyles";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<p>test</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
