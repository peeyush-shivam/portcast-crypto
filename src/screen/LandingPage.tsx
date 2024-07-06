import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="w-full h-[70vh]">
      <Navbar />
      <main className=" pt-20 pl-24 pr-24 gap-4 max-md:pl-8 max-md:pr-8">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default LandingPage;
