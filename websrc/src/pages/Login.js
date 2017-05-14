// @flow

import React, { Component } from "react";
import backend from "../util/backend";

import Button from "../components/Button.js";
import Input from "../components/Input.js";
import { Link } from "../routing/Router";

import AnimatedDots from "../components/AnimatedDots";

import { singleNote, Notifier } from "../stores/Notifications";
import userStore from "../stores/users";

type State = {
  activity: string
};

type Props = {
  match: {
    path: string
  }
};

export default class Login extends Component<void, Props, Object> {
  state: {
    activity: string,
    animatedDots: boolean,
    accounts: string
  };

  constructor(props: any) {
    super(props);
    this.state = {
      activity: "loggin-in",
      animatedDots: false,
      accounts: "login"
    };
  }

  componentDidMount() {
    this.newPath(this.props.match.path);
  }

  componentWillReceiveProps(props: Props) {
    let match = props.match;
    let path: string = match.path;
    this.newPath.call(this, path);
  }

  notification() {
    if (this.state.notification) {
      return null;
    } else {
      return null;
    }
  }

  newPath(path: string) {
    switch (path) {
      case "/accounts/new": {
        this.setState({ accounts: "new" });
        break;
      }
      case "/accounts/login": {
        this.setState({ accounts: "login" });
        break;
      }
      default: {
        this.setState({ accounts: "login" });
        break;
      }
    }
  }

  nextButton(event: Event) {
    event.preventDefault();
  }

  processCredentials(email: string, password: string) {
    userStore.loginUser(email, password);
  }

  formSubmitted(event: Event & { currentTarget: HTMLFormElement }) {
    event.preventDefault();
    let form: EventTarget = event.currentTarget;
    if (form instanceof HTMLFormElement) {
      if (
        form.elements.email instanceof HTMLInputElement &&
        form.elements.password instanceof HTMLInputElement
      ) {
        let email, password;
        email = form.elements.email.value;
        password = form.elements.password.value;

        if (email !== "" && password !== "") {
          this.processCredentials(email, password);
          this.setState({ animatedDots: false });
        }
      } else {
        throw new Error(
          "expected form to have [email & password] input elements"
        );
      }
    } else {
      throw new Error("expected form submit event");
    }
  }
  renderedTexts() {
    let items = {}, accounts = this.state.accounts;
    items.title = this.state.accounts === "new" ? "New Account" : "Mobitill";
    items.prompt = this.state.accounts === "new"
      ? "Create with Email and Password"
      : "Login with your credentials";

    items.option1 = this.state.accounts === "new"
      ? "Just Login"
      : "Create new Account";

    items.linkRoute1 = accounts === "new" ? "/accounts/login" : "/accounts/new";
    return items;
  }
  render() {
    let texts = this.renderedTexts();

    return (
      <div className="login-page">
        <Notifier singleNote={singleNote} />
        <div className="card login-form-box">
          <div className="heading">
            <span className={["large", this.state.accounts].join(" ")}>
              {texts.title}
            </span>
            <AnimatedDots animate={this.state.animatedDots} />
            {" "}
            <br />
            {texts.prompt}
          </div>
          <form className="login-form" onSubmit={this.formSubmitted.bind(this)}>
            <Input name="email" label={"username"} current="blue" />
            <Input
              name="password"
              label={"password"}
              type="password"
              current="blue"
            />

            <div className="mini-footer">
              <span className="link-new">
                <span className="link">
                  <span data-path={texts.linkRoute1}>
                    {texts.option1}
                  </span>
                </span>
              </span>
              <Button type="primary" onClick={this.nextButton.bind(this)}>
                next
              </Button>
            </div>
          </form>
        </div>

        <style jsx>
          {`
          .login-page {
            display: flex;
            align-items: center;
            justify-items: center;
            height: 100vh;
            max-height: 100vh;
            overflow: hidden;
            width: 100%;
            background-image: url("/static/assets/abstract-background.jpg");
            font-family: Roboto;
          }
          .login-form-box {
            width: 450px;
            height: 500px;
            padding: 50px;
            margin: auto;
            box-shadow: 1px 1px 2px 1px rgba(200,200,200,1);
            background-color: white;
            align-items: center;
          }
          .large {
            font-size: 1.3em;
            color: #999;
            font-weight: 300;
          }
          .large.new {
            color: #8E24AA;
          }
          .login-form {
            height: inherit;
            padding-top: 25px;
            margin: auto;
            text-align: center;
          }
          .login-form .input-box {
            margin-top: 10px;
            text-align: right;
          }
          .login-form .submit-button {
            width: 90%;
            margin: auto;
            margin-top: 20px;
          }
          .mini-footer {
            width: 100%;
            text-align: left;
            margin-top: 50px;
          }
          .mini-footer .button {
            float: right;
            margin-left: auto;
            margin-right: 0;
          }
          .link-new {
            display: inline-block;
            min-width: 143px;
            margin-right: 53px;
            cursor: pointer;
          }
          .link-new > .link {
            color: #78909C;
            cursor: pointer;
          }

          /* media queries */
          @media(max-width: 450px) {
            .login-form-box {
              width: 100%;
            }
          }

          @media(max-width: 340px) {
            .login-form-box {
              padding: 10px;
              padding-top: 50px;
            }
            .login-form-box :global(.input) {
              width: 100%;
            }
          }
        `}
        </style>
      </div>
    );
  }
}
