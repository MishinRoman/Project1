import React, { useEffect, useState } from "react";
import { TOKEN_KEY } from "../services/constants";
import { Button } from "reactstrap";
import CurrenceCard from "./CurrenceCard";

const token = localStorage.getItem(TOKEN_KEY);

export const FetchData = (props) => {
  const [currencies, setCurrencies] = useState([]);
  const [hidden, setHidden] = useState(false);
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

  return (
    <>
      <h1 className="m-0-auto">Курс валют</h1>
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Наименование</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {currencies.map((currency) => (
            <tr key={currency.id}>
              <td>{currency.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>{error}</div>
    </>
  );
};
