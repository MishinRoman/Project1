import React, { useState, useEffect } from "react";
import { FetchData } from "./components/FetchData";
import LoginForm from "./components/LoginForm";
import { PATTERN_USER_FORM, TOKEN_KEY } from "./services/constants";
import ButtonForm from "./components/UI/Button/ButtonForm";

export const App = () => {
  const [pattern, setPattern] = useState(PATTERN_USER_FORM.registration);
  const [visibal, setVisibal] = useState(false);
  const [isToken, setIsToken] = useState(!localStorage.getItem(TOKEN_KEY));

  useEffect(() => {
    return isToken ? (
      <FetchData />
    ) : (
      <div>
        <div className="d-flex justify-content-end">
          <ButtonForm
            data-bs-toggle="modal"
            data-bs-target=""
            onClick={() => {
              setVisibal(true);
              setPattern(PATTERN_USER_FORM.registration);
            }}
          >
            Регистрация
          </ButtonForm>
          <ButtonForm
            data-bs-toggle="modal"
            data-bs-target="#modal1"
            onClick={() => {
              setVisibal(true);
              setPattern(PATTERN_USER_FORM.authorization);
            }}
          >
            Авторизация
          </ButtonForm>
        </div>
        <LoginForm
          hidden={!visibal}
          pattern={pattern}
          className={""}
          tabindex="-1"
          id={"modal1"}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        />
      </div>
    );
  }, [isToken]);
};
