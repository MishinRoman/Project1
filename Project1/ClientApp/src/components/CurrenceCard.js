import { React, useEffect, useState } from "react";
import { TOKEN_KEY } from "../services/constants";
const token = localStorage.getItem(TOKEN_KEY);

const CurrenceCard = (props) => {
  const [currency, setCurrency] = useState({});

  const getCurrency = async () => {
    const response = await fetch(
      `http://localhost:5098/api/currency/${props.id}`,
      {
        headers: !token ? {} : { Authorization: `Bearer ${token}` },
        credentials: "include",
      }
    );
    const data = await response.json().catch((error) => console.log(error));

    setCurrency(data);
  };

  return (
    <button
      onClick={() => {
        getCurrency();
      }}
    >
      <h3>{currency.rate}</h3>
    </button>
  );
};

export default CurrenceCard;
