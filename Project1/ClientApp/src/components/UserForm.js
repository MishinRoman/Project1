import { React, useState } from "react";
import ValueInput from "./UI/Input/ValueInput";
import ButtonForm from "./UI/Button/ButtonForm";

const UserForm = () => {
  const [user, setUser] = useState({ login: "", password: "" });
  return (
    <form style={{ width: 239, height: 243 }}>
      <ValueInput
        name={"Логин"}
        type={"text"}
        placeholder={"Логин"}
        value={user.login}
        onChange={(e) => {
          setUser({ ...user, login: e.target.value });
        }}
        requred
      />
      <ValueInput
        name={"Пароль"}
        type={"password"}
        placeholder={"Пароль"}
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        requred
      />
      <ButtonForm.ButtonForm children={"Отправить"} />
    </form>
  );
};
export default UserForm;
