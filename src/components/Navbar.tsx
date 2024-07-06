import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/cryptoMarkLogo.png";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React from "react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { favourites } = useSelector((state: RootState) => state.cryptoData);

  return (
    <nav className="navbar w-full h-16 flex justify-between items-center shadow-md pl-24 pr-24 gap-4 max-md:pl-8 max-md:pr-8 fixed top-0 z-10 bg-white">
      <div>
        <img
          src={logo}
          alt="coinmark__logo"
          className="min-h-10 min-w-10 h-10 w-10 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="account flex gap-4">
        <Link to={"/favourites"} className="flex items-center relative">
          <Heart size={35} />
          {favourites.length > 0 && (
            <div className="h-4 min-w-4 p-1 bg-[#cb9140] flex justify-center items-center absolute top-0 right-0 rounded-full text-xs text-white">
              {favourites.length}
            </div>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
