import React from "react";

export default function Button(props) {
  let { onClick, children, type } = props;
  let buttonClick = event => {
    if (typeof onClick === "function") {
      return onClick(event);
    }
  };

  let classes = ["button"];

  if (type) classes.push(type);

  return (
    <button className={classes.join(" ")}>
      {children}

      <style jsx>
        {
          `
          .button {
            outline: none;
            border: 2px solid #000;
            width: 150px;
            height: 32px;
            /* margin: auto; */
            margin-top: 15px;
            background-color: #fff;
            border-radius: 2px;
            text-transform: uppercase;
            font-weight: 700;
            cursor: pointer;
            transition: background-color 1s;
          }
          .button:hover {
            box-shadow: 1px 1px 1px 1px #ccc;
            background-color: #000;
            color: white;
          }
          .button:active {
            transform: scale(0.97);
          }
          .button.primary {
            background-color: #4285f4;
            border-color: #4285f4;
            color: white;
          }
        `
        }
      </style>
    </button>
  );
}
