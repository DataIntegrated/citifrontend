// @flow

import React from "react";
import { observable } from "mobx";

import { redirect } from "../routing/Router";
import { request, wrapError } from "../util/backend";
import { singleNote } from "../stores/Notifications";

class UserStore {
  @observable user: ?Object;
  constructor() {
    this.user = null;
    this.checkUser();
  }
  checkUser() {
    let v = localStorage.getItem("loggedin");
    if (v) {
      this.user = JSON.parse(v);
    }
  }
  async loginUser(username: string, password: string) {
    try {
      let url = "https://revenue.eu-gb.mybluemix.net/api/user/login";
      let data = { username, password };
      let json = await wrapError(request(url, "POST", data));
      console.log(json);
      localStorage.setItem("loggedin", JSON.stringify(json));
      this.checkUser();
      redirect("/");
    } catch (err) {
      singleNote.new("error", err.message);
    }
  }

  async logout() {
    localStorage.setItem("loggedin", JSON.stringify(null));
    redirect("/accounts/login");
  }
}

var store = new UserStore();

export default store;
export { UserStore };
