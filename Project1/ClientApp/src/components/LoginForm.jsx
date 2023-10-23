import React, { useState, useEffect } from "react";
import ValueInput from "./UI/Input/ValueInput";
import ButtonForm from "./UI/Button/ButtonForm";

function LoginForm({ props, visibal }) {
  const [user, setUser] = useState({ UserName: "", Passwor: "" });
  const [userErrors, setUserErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [visibalForm, setVisibalForm] = useState(visibal);

  const [pattern, setPattern] = useState({
    HeaderLabel: "Регистрация",
    LinkForFetch: "https://localhost:7282/api/login/register",
  });

  const validInput = (val) => {
    const errors = {};

    if (!val.UserName || !val.UserName.trim()) {
      errors.UserName = "Вы не указали имя";
    }
    if (!val.UserName || !val.UserName.trim()) {
      errors.Password = "Вы не указали пароль";
    }

    return errors;
  };

  const sendApi = async (user) => {
    await fetch(pattern.LinkForFetch, {
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((responce) => {
        // responce.json()
        setIsSubmit(responce.ok);
        console.log(responce);
      })
      .catch((resposError) => {
        console.log(resposError);
      });

    if (isSubmit) {
      setUser({ UserName: "", Password: "" });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setUserErrors(validInput(user));
    sendApi(user);
  };

  useEffect(() => {
    if (Object.keys(userErrors).length === 0 && isSubmit) {
      sendApi(user);
    }

    console.log(userErrors);
  }, [userErrors]);

  return (
    <div className={"col-3 m-4 justify-content-sm-center"}>
      <h4>{pattern.HeaderLabel}</h4>
      <form onSubmit={onSubmit} className="input-form">
        <ValueInput
          value={user.UserName}
          onChange={(e) => setUser({ ...user, UserName: e.target.value })}
          children={"Имя пользвателя"}
          placeholder={"Ввидите имя пользователя"}
          label={userErrors.UserName}
          isrequred
        />
        <ValueInput
          value={user.Password}
          onChange={(e) => setUser({ ...user, Password: e.target.value })}
          children={"Пароль"}
          placeholder={"Ввидите пароль"}
          label={userErrors.Password}
          type={"password"}
        />
        <div className="d-flex">
          <label>{userErrors.Response}</label>
          <ButtonForm type="button">Закрыть</ButtonForm>

          <ButtonForm type="submit" className="btn btn-primary">
            Отправить
          </ButtonForm>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
