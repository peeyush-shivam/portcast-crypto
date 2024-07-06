import React from "react";
import { DataTable, DataTableCellClickEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToFav, removeFromFav } from "../redux/cryptoSlice";
import { AppDispatch, RootState } from "../redux/store";

interface Currency {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
}

const CryptoTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currencies, favourites } = useSelector(
    (state: RootState) => state.cryptoData
  );

  const handleAddFav = (currency: DataTableCellClickEvent<Currency[]>) => {
    console.log(currency);
    const target = (currency.originalEvent.target as HTMLElement).id; // important issue to avoid
    const tableField = currency.value.field;
    const rowData = currency.value.rowData as Currency;

    if (tableField === "fav" && target === "add") {
      dispatch(addToFav(rowData));
    } else if (tableField === "fav") {
      dispatch(removeFromFav(rowData.id));
    }
  };

  const favBodyTemplate = (currency: Currency) => {
    const isFav = favourites.some((item) => item.id === currency.id);
    return (
      <div className="cursor-pointer ">
        {isFav ? (
          <Heart
            size={20}
            fill="#cb9140"
            className="text-[#cb9140]"
            id="remove"
          />
        ) : (
          <Heart size={20} id="add" />
        )}
      </div>
    );
  };

  const imageBodyTemplate = (currency: Currency) => {
    return (
      <div
        className="flex items-center justify-between min-w-8 gap-2 relative pt-2 pb-2"
        data-testid="crypto-table"
      >
        <div className="flex gap-2">
          <img
            src={`https://assets.coincap.io/assets/icons/${currency.symbol.toLowerCase()}@2x.png`}
            alt={currency.id}
            className="w-8 shadow-2 border-round"
          />
          <div className="flex flex-col">
            <span className="text-sm">{currency.name}</span>
            <span className="text-xs">{currency.symbol}</span>
          </div>
        </div>
      </div>
    );
  };

  const nameBodyTemplate = (currency: Currency) => {
    return (
      <div className=" cursor-pointer">
        <Link to={`/crypto/${currency.id}`} state={{ currency }}>
          {currency.name}
        </Link>
      </div>
    );
  };

  const symbolBodyTemplate = (currency: Currency) => {
    return <div>{currency.symbol}</div>;
  };

  const priceBodyTemplate = (currency: Currency) => {
    return <div>${Number(currency.priceUsd).toFixed(2)}</div>;
  };

  const marketCapBodyTemplate = (currency: Currency) => {
    return <div>${Number(currency.marketCapUsd).toFixed(2)}</div>;
  };

  return (
    <div className="flex flex-col h-fit pt-4 pb-4">
      {currencies.length > 0 ? (
        <DataTable
          value={currencies}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ width: "100%" }}
          cellSelection
          selectionMode="single"
          onSelectionChange={(e: any) => handleAddFav(e)}
          paginatorTemplate=" FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        >
          <Column
            header=""
            field="fav"
            headerStyle={{
              minWidth: "2rem",
              padding: "5px 0 5px 0",
            }}
            body={favBodyTemplate}
          ></Column>
          <Column
            header="Currency"
            field="id"
            headerStyle={{
              minWidth: "10rem",
              padding: "5px 0 5px 0",
            }}
            body={imageBodyTemplate}
          ></Column>
          <Column
            sortable
            align="right"
            field="name"
            header="Name"
            headerStyle={{
              minWidth: "10rem",
              padding: "5px 0 5px 0",
            }}
            body={nameBodyTemplate}
          ></Column>
          <Column
            sortable
            align="right"
            field="symbol"
            header="Symbol"
            headerStyle={{
              minWidth: "10rem",
              padding: "5px 0 5px 0",
            }}
            body={symbolBodyTemplate}
          ></Column>
          <Column
            align="right"
            field="priceUsd"
            header="Price"
            headerStyle={{
              minWidth: "10rem",
              padding: "5px 0 5px 0",
            }}
            body={priceBodyTemplate}
          ></Column>
          <Column
            align="right"
            header="Market Cap"
            field="marketCapUsd"
            headerStyle={{
              minWidth: "10rem",
              padding: "5px 0 5px 0",
            }}
            body={marketCapBodyTemplate}
          ></Column>
        </DataTable>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CryptoTable;
