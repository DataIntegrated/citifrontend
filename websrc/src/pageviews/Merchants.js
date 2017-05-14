// @flow
import type JSX from "react";

import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import { observer } from "mobx-react";

import { Link, redirect } from "../routing/Router";

import former from "../components/FormFromObject";
import AutoTable from "../components/Table";

import { createNewMerchant } from "../util/vatserver";
import merchantStore from "../stores/merchants";
import { singleNote } from "../stores/Notifications";

type MerchantStoreProps = {
  store: Object
};

class NewMerchant extends Component<void, MerchantStoreProps, void> {
  async newMerchantData(data) {
    try {
      let res = await createNewMerchant(data);
      singleNote.new("info", "created new merchant");
    } catch (err) {
      singleNote.new("error", err.message);
      console.log(err);
    }
  }
  render() {
    let typ = {
      name: "Mike Store",
      location: "nairobi",
      categorytype: "5251",
      username: "mystore",
      password: "mystore1234"
    };

    return (
      <div className="new-merchant">
        {former(typ, this.newMerchantData.bind(this))}
      </div>
    );
  }
}

@observer class AllMerchants extends Component {
  constructor(props: MerchantStoreProps) {
    super(props);
  }
  rowClick(e: Event, data: Object) {
    redirect(`/merchants/single/${data.pin}`);
  }
  render() {
    let store = this.props.store;
    let list: Array<Object> = store.list;
    let headers = ["id", "pin", "name", "vat", "location", "categorytype"];
    return (
      <div className="all-merchants">
        <div>
          {list.length === 0
            ? "No Merchants to display yet"
            : "Registered Merchants"}
        </div>
        <div>
          {list.length > 0
            ? <AutoTable
                onRowClick={this.rowClick.bind(this)}
                headers={headers}
                list={list}
              />
            : null}
        </div>
      </div>
    );
  }
}

@observer class SingleMerchant extends Component {
  constructor(props: MerchantStoreProps) {
    super(props);
  }
  componentWillMount() {
    this.props.store.fetchSingleMerchantSummary()
  }
  render() { return null }
}

type MerchantProps = {
  match: { option: string }
};

export default class Merchants extends React.Component {
  state: {
    renderOption: ?JSX.Element<*>
  };
  constructor(props: MerchantProps) {
    super(props);
    this.state = { renderOption: null };
  }
  componentDidMount() {
    this.renderOptions();
  }
  componentWillReceiveProps(props: MerchantProps) {
    this.renderOptions(props);
  }
  renderOptions(p: ?MerchantProps) {
    let props = p || this.props;
    let option = props.match.option;
    let pin = props.match.id;
    
    switch (option) {
      case "new":
        return this.setState({
          renderOption: <NewMerchant store={merchantStore} />
        });
      case "single":
        return this.setState({
          renderOption: <SingleMerchant pin={pin} store={merchantStore} />
        });
      default:
        return this.setState({
          renderOption: <AllMerchants store={merchantStore} />
        });
    }
  }
  findMerchantClick(e: Event) {
    let t = e.target;
    if (t instanceof HTMLButtonElement) {
      let input = this.refs["merchant-find"];
      let text = input.value;
      if (text !== "") {
        redirect(`/merchants/single/${text}`);
      }
    }
  }
  render() {
    let option = this.props.match.option;
    let headerClasses = ["header", option];
    return (
      <div className="merchant-view">
        <div className="wrapper">
          <header className={headerClasses.join(" ")}>
            <Link path="/merchants">
              <Button basic color="purple">All Merchants</Button>
            </Link>
            <Link path="/merchants/new">
              <Button basic color="purple">New Merchant</Button>
            </Link>
            <span>
              <div className="ui action input">
                <input
                  ref="merchant-find"
                  type="text"
                  placeholder="merchant pin"
                />
                <button
                  onClick={this.findMerchantClick.bind(this)}
                  className="ui purple button button"
                >
                  find
                </button>
              </div>

            </span>
          </header>

          <div>{this.state.renderOption}</div>
        </div>

        <style jsx>
          {`
        .merchant-view {
          width: 100vw;
        }
        .wrapper {
          width: 85%;
          margin: auto;
        }
        .header {
          padding-top: 5px;
          margin-bottom: 25px;
        }
        .header.single {
          opacity: 0;
        }
        .merchant :global(input) {
          margin-bottom: 2px;
        }
      `}
        </style>
      </div>
    );
  }
}
