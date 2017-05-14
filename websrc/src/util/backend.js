// @flow
"use strict";

import "whatwg-fetch";

import { singleNote } from "../stores/Notifications";

function accountsUrl(path: string) {
  let base = "/backend";
  return base + "/accounts" + path;
}

export function host() {
  return window.location.host;
}

export function wrapError(req: Promise<Response>) { 
  return req.then(async response => {
    if (response.status >= 200 && response.status < 399) {
      // success ranges
      return await response.json();
    }
    if (response.status === 403) {
      throw new Error("not authenticated");
    }
    let json = await response.json();
    if (json.msg) {
      throw new Error(json.msg)
      // singleNote.new("error", json.msg);
    }
    return null;
  })
}

export function request(
  url: string,
  method: ?string,
  data: ?Object,
  headers: ?Object
) {
  let fetchOptions: Object = {};

  // some default headers
  let defaultHeaders = {
    "Content-Type": "application/json"
  };
  // method
  fetchOptions.method = method || "GET";
  // headers
  fetchOptions.headers = Object.assign(defaultHeaders, headers || {});
  if (data) fetchOptions.body = JSON.stringify(data);
  return fetch(url, fetchOptions);
}

let backend = {};
backend.authorise = function authorise(email: string, password: string) {
  return request(accountsUrl("/authorise"), "POST", { email, password });
};

backend.newaccount = function authorise(email: string, password: string) {
  return request(accountsUrl("/newaccount"), "POST", { email, password });
};

// expose the whole block
export default backend;
