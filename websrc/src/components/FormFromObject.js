// @flow

import React from "react";
import { Input, Button } from "semantic-ui-react";

import { singleNote } from "../stores/Notifications";

function returnElement(name: string, type: string) {
  switch (type) {
    case "string":
      return (
        <Input
          key={Math.random()}
          name={name}
          type={"text"}
          placeholder={name}
          label={name}
        />
      );
    case "number":
      return (
        <Input
          key={Math.random()}
          name={name}
          type={"number"}
          placeholder={name}
          label={name}
        />
      );
    default:
      return (
        <Input
          key={Math.random()}
          name={name}
          placeholder={name}
          label={name}
        />
      );
  }
}

export default function Form(obj: Object, callback: ?Function) {
  if (!obj || Array.isArray(obj)) {
    throw new Error("object must be a plain javascript object");
  }
  let keys = Object.keys(obj).filter(key => obj.hasOwnProperty(key));
  let elements = keys.map(key => {
    let value = obj[key];
    let typ = typeof value;

    return [returnElement(key, typ), <br />];
  });

  // function called when the form is submitted
  let submitted = function submitted(e: Event) {
    let dirty = false;
    let response = {};
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
      let target: HTMLFormElement = e.target;
      keys.map(key => {
        let elem = target[key];
        let value = elem.value;
        if (value === "") {
          dirty = true;
          return;
        }
        response[key] = value;
      });
      if (!dirty) {
        if (typeof callback === "function") callback(response);
      } else {
        singleNote.new("error", "some fields are empty");
      }
    } else {
      throw new Error("expecting form events");
    }
  };

  return (
    <form className="auto-form" onSubmit={submitted}>
      {elements}

      <Button primary>submit</Button>
      <style jsx>{`
        .auto-form {
          width: 450px;
          box-shadow: 1px 1px 1px 1px rgba(150, 150, 150, .4);
          padding: 20px 20px 10px 20px;
        }
        .auto-form :global(.input) {
          margin-bottom: 10px;
          min-width: 300px;
        }
        .auto-form :global(button) {
          text-transform: uppercase;
          font-size: 0.8em;
          font-weight: bold;
        }
        :global(.ui.label) {
          margin-bottom: 10px;
          max-width: 150px;
        }
      `}</style>
    </form>
  );
}
