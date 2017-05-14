// @flow
"use strict";

var $global;

/**
 * change the browser location hash
 */
function changeRoute(path: string) {
  // switch the location hash of the page
  if (!path.startsWith("/")) {
    path = "/" + path.trim();
  }
  if (typeof global.location === "object") {
    $global.location.hash = path;
  }
}

/**
 * create component of the routing tree
 *
 * @param {[]} arr - Array of nodes
 * @param {Object} container - node container
 * @param {Function} callback - callback function attached at the leaf
 */
function createTree(arr, container, callback) {
  var previous = container;

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];

    if (item.startsWith(":")) {
      item = ":parameter";
    }
    if (!previous[item]) {
      if (i === arr.length - 1) {
        previous[item] = callback;
      } else {
        previous[item] = {};
      }
    }

    previous = previous[item];
  }
}

/**
 * takes url path and returns an array of nodes
 *
 * @param {string} path - url path
 * @return {[]} nodes
 */
function scan(_path) {
  let path = _path || "";

  if (!path.startsWith("/")) {
    path = "/" + path.trim();
  }

  let arr = path.split("/");
  let ret = arr.splice(1);
  return ret;
}

// a global container
let container = {};

/**
 * register a url into the router
 */
function register(path: string, callback: () => void) {
  createTree(scan(path), container, callback);
}

/**
 * trigger the callback of a registered route
 */
function trigger(path: string) {
  var arr = scan(path);
  var params = [];

  var previous = container;

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (!previous[item]) {
      item = ":parameter";
      if (!previous[item]) {
        return;
      } else {
        params[params.length] = arr[i];
      }
    }
    previous = previous[item];
  }

  if (typeof previous === "function") {
    previous({ params });
  }
}

// redirect the page via push state
function redirect(path: string, title: string) {
  if (!path) {
    return;
  }

  $global.history.pushState({}, title || "page", path);
  trigger(path);
}

/**
 * init function to setup really simple routing on the browser, takes as a parameter the window object, or similar
 *
 * @param {Object} window - the window object
 * @return {Object}
 */
function init(window: any) {
  // listen for popstate event
  if ("onpopstate" in window) {
    window.addEventListener("popstate", e => {
      let location = window.location;
      trigger(location.pathname);
    });
  }

  $global = window;
  return {
    register,
    redirect,
    start() {
      let path = window.location.pathname === "" ? "/" : window.location.pathname
      trigger(path);
    }
  };
}

export default init;
