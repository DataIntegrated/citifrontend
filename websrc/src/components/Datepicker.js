// @flow

import React from "react";

export default class DatePicker extends React.Component {
  state: {
    month: number,
    year: number
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    };
  }
  clicked() {
    if (typeof this.props.onClick === "function") {
      let { month, year } = this.state;
      this.props.onClick({ month, year });
    }
  }
  render() {
    return (
      <div className="ui action input datepicker">
        <input
          onChange={e => this.setState({ year: e.target.value })}
          value={this.state.year}
          type="number"
          placeholder="Year"
        />
        ;
        <input
          onChange={e => this.setState({ month: e.target.value })}
          value={this.state.month}
          type="number"
          placeholder="Month"
        />
        ;
        <button
          onClick={this.clicked.bind(this)}
          type="submit"
          className="ui button primary"
        >
          GO
        </button>
      </div>
    );
  }
}
