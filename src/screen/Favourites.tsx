import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React from "react";

const Favourites: React.FC = () => {
  const { favourites } = useSelector((state: RootState) => state.cryptoData);

  return (
    <div className=" w-full h-fit flex flex-col gap-8">
      <div className=" text-3xl font-semibold text-gray-600">Favourites</div>
      <div className="favourite__currencies flex flex-wrap gap-4">
        {favourites.length > 0 ? (
          favourites.map((currency, index) => (
            <div
              key={index}
              className="w-36 h-36 bg-slate-200 rounded-md p-4 flex justify-between items-center gap-6"
            >
              <div className=" w-full flex flex-col gap-2 justify-center items-center">
                <img
                  src={`https://assets.coincap.io/assets/icons/${currency.symbol.toLowerCase()}@2x.png`}
                  alt={currency.id}
                  className="w-8 shadow-2 border-round"
                />
                <div className="w-full flex justify-center items-center flex-col">
                  <span className="text-sm text-ellipsis font-semibold">
                    {currency.name}
                  </span>
                  <span className="text-xs">{currency.symbol}</span>
                  <span className="text-xs pt-2">
                    ${Number(currency.priceUsd).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center items-center">
            <span>Start adding to your favourites.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
