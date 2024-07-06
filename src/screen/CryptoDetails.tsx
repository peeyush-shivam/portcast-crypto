import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { SquareChevronDown, SquareChevronUp } from "lucide-react";
import numbro from "numbro";
import axios from "axios";
import { setSelected } from "../redux/cryptoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const CRYPTOURL = "https://api.coincap.io/v2/assets/";

const CryptoDetails: React.FC = () => {
  const { pathname, state } = useLocation();
  const currencyId = pathname.split("/")[2];
  const [price, setPrice] = useState<number>(0);
  const [color, setColor] = useState<string>("slate");

  const dispatch = useDispatch();
  const { selected } = useSelector((state: RootState) => state.cryptoData);

  const getCryptoDetails = useCallback(async () => {
    try {
      const response = await axios.get(`${CRYPTOURL}${currencyId}`);
      dispatch(setSelected(response.data.data));
    } catch (error) {
      console.error("Failed to fetch crypto details:", error);
    }
  }, [currencyId]);

  useEffect(() => {
    getCryptoDetails();
    const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${currencyId}`);
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const newPrice = Number(response[currencyId]);

      if (newPrice > price) {
        setColor("green");
      } else if (newPrice < price) {
        setColor("red");
      }

      setPrice(newPrice);
    };
    ws.onclose = () => ws.close();
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="crypto__details h-fit w-full flex justify-center items-center">
      <div className="h-1/4 w-3/4 bg-slate-200 rounded-md p-4 flex flex-col justify-between gap-6">
        <div className="flex flex-wrap items-center justify-between max-md:flex-col max-md:items-center max-md:gap-4">
          <div className="basic-details flex gap-4 max-md:flex-col max-md:items-center">
            <img
              src={`https://assets.coincap.io/assets/icons/${selected?.symbol?.toLowerCase()}@2x.png`}
              alt="currency-image"
              className="h-14 w-14"
            />
            <span className="text-2xl text-slate-600 flex gap-1 items-center font-semibold">
              <span>{selected?.name}</span>
              <span className="text-base">({selected?.symbol})</span>
            </span>
            <div className="flex items-center gap-4 ">
              <Avatar
                label={`#${selected?.rank}`}
                size="xlarge"
                className="bg-[#cb9140] text-white font-semibold rounded h-6 w-fit pl-1 pr-1 text-sm"
              />
            </div>
          </div>

          <div className="price-percentahe flex items-center gap-2 ">
            <span className={`text-xl font-semibold text-${color}-400`}>
              ${price || Number(state.currency.priceUsd).toFixed(2)}
            </span>
            <span
              className={`text-xl flex gap-1 items-center ${
                Number(selected?.changePercent24Hr) > 0
                  ? "text-green-400"
                  : "text-red-400 "
              }`}
            >
              {Number(selected?.changePercent24Hr).toFixed(2)}
              {Number(selected?.changePercent24Hr) > 0 ? (
                <SquareChevronUp size={15} color="#4ade80" />
              ) : (
                <SquareChevronDown size={15} color="#f87171" />
              )}
            </span>
          </div>
        </div>
        <div className="flex justify-between max-md:flex-col max-md:items-center max-md:gap-4">
          <div className="flex flex-col max-md:items-center">
            <span className="text-lg font-semibold text-slate-600">
              Market Cap
            </span>
            <span>
              {numbro(Number(selected?.marketCapUsd)).formatCurrency({
                average: true,
                mantissa: 2,
                optionalMantissa: true,
                spaceSeparated: true,
              })}
            </span>
          </div>
          <div className="flex flex-col max-md:items-center">
            <span className="text-lg font-semibold text-slate-600">
              Volume{" "}
              <span className="text-base   font-semibold text-slate-600">
                (24Hr)
              </span>
            </span>
            <span>
              {numbro(Number(selected?.volumeUsd24Hr)).formatCurrency({
                average: true,
                mantissa: 2,
                optionalMantissa: true,
                spaceSeparated: true,
              })}
            </span>
          </div>
          <div className="flex flex-col max-md:items-center">
            <span className="text-lg font-semibold text-slate-600">Supply</span>
            <span>
              {numbro(Number(selected?.supply)).formatCurrency({
                average: true,
                mantissa: 2,
                optionalMantissa: true,
                spaceSeparated: true,
              })}
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-[#cb9140] w-fit h-fit rounded-md text-white p-1">
            <Link
              to={selected?.explorer}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore more
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
