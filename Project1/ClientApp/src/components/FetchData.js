import React, { useEffect, useState } from "react";
import { TOKEN_KEY } from "../services/constants";
import CurrenceCard from "./CurrenceCard";

const token = localStorage.getItem(TOKEN_KEY);

export const FetchData = (props) => {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState("");

  console.log("Submited in Fetcn", props.submited);

  useEffect(() => {
    const getCurrencies = async () => {
      const response = await fetch("http://localhost:5098/api/currency", {
        headers: !token ? {} : { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      const data = await response.json().catch((error) => {
        console.log(error);
        setError(error);
      });
      setCurrencies(data);
    };

    getCurrencies();
  }, [props.submited]);
  const handelClick = function (value) {
    return value;
  };
  return (
    <>
      <h1 className="m-0-auto">Курс валют</h1>
      <th>Наименование</th>
      {currencies.map((currency) => (
        <div key={currency.id}>
          <CurrenceCard
            id={currency.id}
            click={handelClick}
            children={currency.name}
          />

          {handelClick}
        </div>
      ))}
      <div>{error}</div>
    </>
  );
};
