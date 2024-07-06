import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Currency {
  id?: string;
  symbol: string;
  name: string;
  priceUsd: string;
  marketCapUsd: string;
}

interface SelectedCurrency extends Currency {
  rank: string;
  supply: string;
  volumeUsd24Hr: string;
  changePercent24Hr: string;
  explorer: string;
}

interface CryptoState {
  currencies: Currency[];
  favourites: Currency[];
  selected: SelectedCurrency;
}

const loadFavourites = () => {
  const favourites = localStorage.getItem("favourites");
  return favourites ? JSON.parse(favourites) : [];
};

const initialState: CryptoState = {
  currencies: [],
  favourites: loadFavourites(),
  selected: {
    rank: "",
    symbol: "",
    name: "",
    supply: "",
    marketCapUsd: "",
    volumeUsd24Hr: "",
    priceUsd: "",
    changePercent24Hr: "",
    explorer: "",
  },
};

const cryptoSlice = createSlice({
  name: "cryptoSlice",
  initialState,
  reducers: {
    addCurrencies: (state, action: PayloadAction<Currency[]>) => {
      return {
        ...state,
        currencies: action.payload,
      };
    },
    addToFav: (state, action: PayloadAction<Currency>) => {
      console.log("add called");
      const tempFav = [...state.favourites, action.payload];
      localStorage.setItem("favourites", JSON.stringify(tempFav));
      return {
        ...state,
        favourites: tempFav,
      };
    },
    removeFromFav: (state, action: PayloadAction<string>) => {
      console.log("remove called");
      const tempFav = state.favourites.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("favourites", JSON.stringify(tempFav));
      return {
        ...state,
        favourites: tempFav,
      };
    },
    setSelected: (state, action: PayloadAction<SelectedCurrency>) => {
      return {
        ...state,
        selected: action.payload,
      };
    },
  },
});

export const { addCurrencies, addToFav, removeFromFav, setSelected } =
  cryptoSlice.actions;
export default cryptoSlice.reducer;
