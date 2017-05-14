// @flow

import React from "react";

export default class TopBar extends React.Component {
  render() {
    return (
      <div className="top-bar">
        <span className="title">{this.props.title}</span>
        <style jsx>{`
          .top-bar {
            display: flex;
            align-items: center;
            width: 100vw;
            height: 57px;
            box-shadow: 1px 1px 1px rgba(180, 180, 180, .4);
            margin-bottom: 10px;
          }

          .title {
            font-weight: bold;
            margin-left: 25px;
            color: #4a148c;
          }
      `}</style>
      </div>
    );
  }
}
