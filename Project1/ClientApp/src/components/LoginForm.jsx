import React, { useState, useEffect } from "react";
import ValueInput from "./UI/Input/ValueInput";
import ButtonForm from "./UI/Button/ButtonForm";
import { PATTERN_USER_FORM } from "../services/constants";
import { registration } from "../services/registration";
import { authorization } from "../services/authorization";

function LoginForm({ ...props }) {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [header, setHeader] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [userErrors, setUserErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState("");

  const validInput = (val) => {
    const errors = {};
    if (!val.userName || !val.userName.trim()) {
      errors.userName = "Вы не указали имя";
    }
    if (!val.password || !val.password.trim()) {
      errors.password = "Вы не указали фамилию";
    }

    return errors;
  };

  useEffect(() => {
    switch (props.pattern) {
      case PATTERN_USER_FORM.registration:
        setHeader("Регистрация");
        break;
      case PATTERN_USER_FORM.authorization:
        setHeader("Авторизация");
        break;

      default:
        setHeader("Сервес временно недоступен. Попробуйте позже");
        break;
    }
    if (Object.keys(userErrors).length === 0 && isSubmit) {
    }

    return (userErrors) => {
      setHeader(userErrors);
    };
  }, [userErrors, props.pattern]);

  const sendForm = (user) => {
    if (props.pattern === PATTERN_USER_FORM.registration) {
      setHeader("Регистрация");
      registration(user);
      // .then(true)
      // .catch((err) => setSubmitErrors(...submitErrors, err));
    } else {
      setHeader("Авторизация");
      authorization(user);
      // .then(true)
      // .catch((err) => setSubmitErrors(...submitErrors, err));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(sendForm(user));

    setUserErrors(validInput(user));

    if (userErrors === null) {
      setUser({ userName: "", password: "" });
    }
  };

  return (
    <div
      {...props}
      className={
        "col-4 mx-auto justify-content-sm-center p-4 opacity-85 border border-primary-subtle top-4 st-20 bg-primary-subtle shadow-lg p-3 mb-5 bg-body-tertiary  rounded"
      }
    >
      <form onSubmit={onSubmit} className="input-form">
        <div></div>
        <h4>{header}</h4>
        <h4>{submitErrors}</h4>
        <ValueInput
          value={user.userName}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
          children={"Имя пользвателя"}
          placeholder={"Ввидите имя пользователя"}
          label={userErrors.userName}
          onBlur={(e) => e.relode}
        />
        <ValueInput
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          children={"Пароль"}
          placeholder={"Ввидите пароль"}
          type={"password"}
          label={userErrors.password}
        />
        <div className="d-flex justify-content-sm-center ">
          <ButtonForm
            onClick={(e) => {
              if (!validInput(user).password && !validInput(user).password) {
                props.authorizeHandler(true);
                onSubmit(e);
              }
            }}
            type="submit"
          >
            Отправить
          </ButtonForm>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
