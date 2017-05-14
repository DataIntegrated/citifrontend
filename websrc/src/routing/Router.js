// @flow

// This component provides simple routing for react components
import React from "react";
import simpleRouter from "./simplerouter";

let routing = null;

let monitor = {};

export function redirect(path: string) {
  if (routing && typeof routing.redirect === "function") {
    routing.redirect(path, "page");
  } else {
    throw new Error("calling redirect before init");
  }
}

export function Link(props: Object) {
  let path: string = props.path;
  let children: Object = props.children;

  let onClick = e => {
    e.preventDefault();
    if (routing == null) {
      throw new Error(
        `Attempting to call Link.onClick before routing is setup`
      );
    }
    routing.redirect(path, "page");
  };

  return (
    <span className={props.className} onClick={onClick}>
      {children}
    </span>
  );
}

export function add(path: string, component: Object) {
  // routing for pages
  if (routing == null) {
    throw new Error(`Attempting to add route before _init`);
  }
  routing.register(path, function(res) {
    if (!res) {
      throw new Error("routing callback did returned undefined");
    }
    if (typeof monitor.trigger === "function") {
      res.path = path;
      monitor.trigger(component, res);
    } else {
      throw new Error("router: monitor.trigger is not set");
    }
  });
}

export class Routed extends React.Component {
  state: {
    component: ?Object
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      component: null
    };
  }

  componentDidMount() {
    let table: Object = this.props.table;
    monitor.trigger = ($component: Object, match: Object) => {
      this.setState({ component: <$component match={match} /> });
    };

    routing = simpleRouter(window);
    if (table) {
      let paths = Object.keys(table);
      for (let i = 0; i < paths.length; i++) {
        let path = paths[i];
        if (table.hasOwnProperty(path)) {
          let component = table[path];
          add(path, component);
        }
      }
    }
    routing.start();
  }

  render() {
    return <div>{this.state.component}</div>;
  }
}
