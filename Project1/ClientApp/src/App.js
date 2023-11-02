import React, { useState, useEffect, useContext } from "react";
import "./custom.css";
import { FetchData } from "./components/FetchData";
import LoginForm from "./components/LoginForm";
import { PATTERN_USER_FORM } from "./services/constants";
import ButtonForm from "./components/UI/Button/ButtonForm";

export const App = () => {
  const [pattern, setPattern] = useState(PATTERN_USER_FORM.registration);

  const [visibal, setVisibal] = useState(false);
  const [submited, setSubmited] = useState(false);

  const authorizeHandler = (handler) => {
    setVisibal(!handler);
    setSubmited(handler);
  };

  return (
    <div style={{ position: "relative" }}>
      <div>
        {submited && pattern === PATTERN_USER_FORM.registration && (
          <div className="d-flex justify-content-end">
            <ButtonForm
              onClick={() => {
                setVisibal(true);
                setPattern(PATTERN_USER_FORM.registration);
              }}
            >
              Регистрация
            </ButtonForm>
            <ButtonForm
              onClick={() => {
                setVisibal(true);
                setPattern(PATTERN_USER_FORM.authorization);
                setSubmited(false);
              }}
            >
              Авторизация
            </ButtonForm>
          </div>
        )}
        {visibal && (
          <>
            <button
              type="button"
              style={{
                marginRight: 0,
                marginLeft: "100%",
                padding: 0,
              }}
              className="btn-close align-content-md-end align-rigth "
              data-bs-dismiss="alert"
              aria-label="Закрыть"
              onClick={() => setVisibal(false)}
            ></button>
            {visibal && (
              <LoginForm
                authorizeHandler={authorizeHandler}
                pattern={pattern}
                style={{
                  position: "absolute",
                  top: "70px",
                  left: "70%",
                  rigth: "23px",
                }}
                z-index={"300"}
              />
            )}
          </>
        )}
      </div>
      {submited && pattern !== PATTERN_USER_FORM.registration && (
        <div>
          {console.log("submited in App", submited)}
          <FetchData submited={submited} />
        </div>
      )}
    </div>
  );
};
