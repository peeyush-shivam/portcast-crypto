import React, { useEffect } from "react";
import CryptoTable from "../components/CryptoTable";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addCurrencies } from "../redux/cryptoSlice";

const COINCAPURL = "https://api.coincap.io/v2/assets";

const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(COINCAPURL);
      dispatch(addCurrencies(response.data.data));
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrencies();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchCurrencies();
  }, []);
  return (
    <div className=" w-full h-fit flex flex-col gap-8">
      <div className=" text-3xl font-semibold text-gray-600">Dashboard</div>
      <div className="w-full h-fit">
        <CryptoTable />
      </div>
    </div>
  );
};

export default Dashboard;
