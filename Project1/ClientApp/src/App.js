import React, { Component, useState } from "react";
import { Layout } from "./components/Layout";
import "./custom.css";
import { FetchData } from "./components/FetchData";
import LoginForm from "./components/LoginForm";

export const App = () => {
  return true ? (
    <FetchData />
  ) : (
    <Layout>
      <LoginForm />
    </Layout>
  );
};
