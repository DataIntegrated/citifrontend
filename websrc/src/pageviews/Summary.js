// @flow

import React, { Component } from "react";
import { observer } from "mobx-react";
import { Statistic } from "semantic-ui-react";

import merchantStore from "../stores/merchants";
import taxdeviceStore from "../stores/taxdevices";
import transactionStore from "../stores/transactions";

function currencyf(n: number) {
  n.toFixed(2).replace(/./g, function(c, i, a) {
    return i && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
  });
  return n;
}

@observer class NumMerchants extends Component {
  render() {
    return (
      <Statistic
        color="olive"
        value={this.props.store.list.length}
        label="Merchants"
      />
    );
  }
}

@observer class NumTaxDevices extends Component {
  render() {
    return (
      <Statistic
        color="brown"
        value={this.props.store.list.length}
        label="Tax Devices"
      />
    );
  }
}

@observer class NumTransactions extends Component {
  render() {
    let store = this.props.store;
    return (
      <div className="tx">
        <span className="prompt">Today</span>
        <Statistic
          value={this.props.store.today.length}
          label={store.today.length === 1 ? "Transaction" : "Transactions"}
        />

        <Statistic>
          <Statistic.Value>
            <span className="cash">
              {currencyf(this.props.store.todaySales)}
            </span>
            <span className="kes">KES</span>
          </Statistic.Value>
          <Statistic.Label>Sales</Statistic.Label>
        </Statistic>

        <span className="tax-list">
          <Statistic value={store.todayTax.tax1} label="Tax 1" />
          <Statistic value={store.todayTax.tax2} label="Tax 2" />
          <Statistic value={store.todayTax.tax3} label="Tax 3" />
          <Statistic value={store.todayTax.tax4} label="Tax 4" />
        </span>

        <style jsx>
          {`
            .tx {
              display: inline-block;
              margin-left: 15px;
              border-radius: 2px;
              border: 1px solid rgba(200,200,200,.4);
              padding: 0 20px 0 10px;
            }
            .tx :global(.statistic) {
              border-right: 1px solid rgba(200,200,200, .4);
              padding-right: 8px;
              min-width: 150px;
              margin-left: 8px;
              margin-right: 8px;
            }
            .tx :global(.statistic:last-child) {
              border-right: none;
            }
            .tax-list {
              font-weight: normal;
            }
            .prompt {
              margin-right: 10px;
            }
            .kes {
              font-size: 14px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default class Summary extends React.Component {
  render() {
    return (
      <div className="summary">
        <div className="stat1">
          <NumMerchants store={merchantStore} />
          <NumTaxDevices store={taxdeviceStore} />
          <NumTransactions store={transactionStore} />
        </div>

        <style jsx>{`
          .summary {
            width: 90vw;
            margin: auto;
          }
        `}</style>
      </div>
    );
  }
}
