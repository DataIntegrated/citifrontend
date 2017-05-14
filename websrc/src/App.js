// @flow

import React, { Component } from "react";
import ReactDOM from "react-dom";

import minireset from "minireset.css";
import css from "./App.css";
import "semantic-ui-css/semantic.min.css";

import { Routed } from "./routing/Router";

import Home from "./pages/Home";
import Login from "./pages/Login";

let table = {
  "/": Home,
  "/:page": Home,
  "/:page/:option": Home,
  "/:page/:option/:id": Home,
  "/accounts/login": Login,
  "/accounts/new": Login
};

let main = document.querySelector("main");
ReactDOM.render(<Routed table={table} />, main);
