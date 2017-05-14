// @flow

import { observable } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";

class SingleNote {
  @observable message: ?string;
  @observable type: ?string;

  new(type: string, message: string, timeout: number = 2500) {
    this.type = "none-transparent";
    this.message = message;
    setTimeout(() => {
      this.type = type;
    }, 100);
    this.timeout(timeout);
  }
  timeout(d: number) {
    setTimeout(() => {
      this.type = null;
      this.message = null;
    }, d);
  }
}

var singleNote = new SingleNote();
window.singleNote = singleNote;

type NotifierProps = {
  singleNote: SingleNote
};
@observer class Notifier extends Component {
  state: {
    message: ?string,
    type: ?string
  };
  constructor(props: NotifierProps) {
    super(props);

    this.state = {
      type: singleNote.type,
      message: singleNote.message
    };
  }
  render() {
    let classes = ["notified", this.props.singleNote.type || "none"];
    return (
      <div className={classes.join(" ")}>
        <span className="message">{this.props.singleNote.message}</span>
        <style>{`
        .notified {
          display: flex;
          align-items: center;
          padding-left: 20px;
          height: 70px;
          width: 280px;
          position: absolute;
          right: 10px;
          top: 10px;
          background-color: #388E3C;
          box-shadow: 1px 1px 1px 1px rgba(150, 150, 150, .5);
          transition: all 0.6s;
          color: white;
          font-size: 1em;
          font-weight: bold;
          text-transform: uppercase;
        }
        .none {
          display: none;
        }
        .none-transparent {
          display: block;
          opacity: 0;
        }
        .error {
          opacity: 1;
          background-color: #d32f2f;
        }
      `}</style>
      </div>
    );
  }
}

export { singleNote, Notifier };
