import React from "react";

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { classes: ["input-box"] };
  }
  inputOnFocus(event) {
    let { classes } = this.state;
    if (classes.indexOf("focus") === -1) {
      classes[classes.length] = "focus";
      this.setState({ classes });
    }
  }
  inputOnBlur(event) {
    let { classes } = this.state;
    let index = classes.indexOf("focus");
    if (index !== -1) {
      classes.splice(index, 1);
      this.setState({ classes });
    }
  }
  render() {
    let props = this.props;
    let { label, type, name } = props;
    let { current, classes } = this.state;

    if (current) classes.push(current);

    return (
      <div className={classes.join(" ")}>
        <label>{label}</label>
        <input
          name={name}
          type={type}
          className="input"
          placeholder={label}
          onFocus={this.inputOnFocus.bind(this)}
          onBlur={this.inputOnBlur.bind(this)}
        />
        <span className="helper" />

        <style jsx>
          {
            `
          .input-box {
            display: inline-flex;
            justify-content: left;
            flex-direction: column;
            cursor: pointer;
            background-color: white;
            margin-top: 30px;
            border-radius: 2px;
            padding: 2px 5px 0 15px;
            width: 100%;
            min-width: 242px;
            min-height: 48px;
            border-bottom: 3px solid #ccc;
            transition: all 0.5s;
          }

          .input-box > label {
            font-weight: normal;
            font-size: 0.8em;
            color: inherit;
            opacity: 0;
            display: inline-flex;
            justify-content: left;
            width:100%;
          }

          .input-box > .input {
            width: 100%;
            border: none;
            outline: none;
            background-color: rgba(0,0,0,0);
            font-family: inherit;
            font-size: 1em;
            min-height: 32px;
            font-weight: 500;
          }

          .input-box > .helper-text {
            color: inherit;
            position:absolute;
            margin-top: 10px;
            font-size: 0.8em;
            opacity: 0;
          }

          .input-box.helper > .helper-text {
            opacity: 1;
          }

          .input-box.blur {
            color: #777;
          }
          .input-box.blur > input {
            opacity: 0;
          }

          .input-box.blur > label {
          }

          .input-box.focus > input {
            opacity: 1;
          }

          .input-box.focus > label {
          }

          /** colors **/
          .input-box.red {
            color: #db4437;
            border-bottom:3px solid #db4437;
          }

          .input-box.focus {
            color: #4285f4;
            border-bottom:3px solid #4285f4;
          }
          `
          }
        </style>
      </div>
    );
  }
}
