import { React, useState } from "react";
import { TOKEN_KEY } from "../services/constants";

const token = localStorage.getItem(TOKEN_KEY);

const CurrenceCard = (props) => {
  const [currency, setCurrency] = useState({});
  const [error, setError] = useState();

  const getCurrency = async () => {
    try {
      const response = await fetch(
        `http://localhost:5098/api/currency/${props.id}`,
        {
          headers: !token ? {} : { Authorization: `Bearer ${token}` },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`Ошибка загурузки`);
      }
      const data = await response.json();
      setCurrency(data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <button
      className="accordion-button collapsed d-flex flex-column align-items-start "
      onClick={() => {
        if (Object.keys(currency).length === 0) {
          getCurrency();
        } else {
          setCurrency({});
        }
      }}
    >
      <div className="bg-primary-border-subtle">{props.children}</div>
      <div className="bg-danger-border-subtle">{error ?? currency.rate}</div>
    </button>
  );
};

export default CurrenceCard;
