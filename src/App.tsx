import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./screen/Dashboard";
import LandingPage from "./screen/LandingPage";
import CryptoDetails from "./screen/CryptoDetails";
import React from "react";
import Favourites from "./screen/Favourites";

const App = () => {
  return (
    <div className="w-screen h-screen font-[Poppins]" data-testid="main-comp">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crypto/:currency" element={<CryptoDetails />} />
            <Route path="/favourites" element={<Favourites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
