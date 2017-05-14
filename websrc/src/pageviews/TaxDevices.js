// @flow
import type JSX from "react";

import React, { Component } from "react";
import { observer } from "mobx-react";
import { Input, Button } from "semantic-ui-react";

import { Link } from "../routing/Router";

import former from "../components/FormFromObject";
import AutoTable from "../components/Table";

import taxdeviceStore from "../stores/taxdevices";
import { createNewTaxDevice } from "../util/vatserver";

import { singleNote } from "../stores/Notifications";

type TaxDeviceStoreProps = {
  store: Object
};

class NewTaxDevice extends Component<void, TaxDeviceStoreProps, void> {
  async newTaxDeviceData(data) {
    try {
      let res = await createNewTaxDevice(data);
      singleNote.new("info", "created new device");
    } catch (err) {
      singleNote.new("error", err.message)
      console.log(err);
    }
  }
  render() {
    let typ = {
      merchantpin: "0169477858",
      devicetype: "esd"
    };

    return (
      <div className="new-merchant">
        {former(typ, this.newTaxDeviceData.bind(this))}
      </div>
    );
  }
}

@observer class AllTaxDevices extends Component {
  constructor(props: TaxDeviceStoreProps) {
    super(props);
  }
  render() {
    let store = this.props.store;
    let list: Array<Object> = store.list;
    let headers = ["id", "merchantpin", "deviceid", "devicetype", "dateissued"];
    return (
      <div className="all-merchants">
        <div>
          {list.length === 0
            ? "No Devices to display yet"
            : "Registered Devices"}
        </div>
        <div>
          {list.length > 0 ? <AutoTable headers={headers} list={list} /> : null}
        </div>
      </div>
    );
  }
}

type TaxDeviceProps = {
  match: { option: string }
};

export default class TaxDevices extends React.Component {
  state: {
    renderOption: ?JSX.Element<*>
  };
  constructor(props: TaxDeviceProps) {
    super(props);
    this.state = { renderOption: null };
  }
  componentDidMount() {
    this.renderOptions();
  }
  componentWillReceiveProps(props: TaxDeviceProps) {
    this.renderOptions(props);
  }
  renderOptions(p: ?TaxDeviceProps) {
    let props = p || this.props;
    let option = props.match.option;
    switch (option) {
      case "new":
        return this.setState({
          renderOption: <NewTaxDevice store={taxdeviceStore} />
        });
      default:
        return this.setState({
          renderOption: <AllTaxDevices store={taxdeviceStore} />
        });
    }
  }
  render() {
    return (
      <div className="merchant-view">
        <div className="wrapper">
          <header className="header">
            <Link path="/taxdevices">
              <Button basic color="purple">All Devices</Button>
            </Link>
            <Link path="/taxdevices/new">
              <Button basic color="purple">New Device</Button>
            </Link>
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
        .merchant :global(input) {
          margin-bottom: 2px;
        }
      `}
        </style>
      </div>
    );
  }
}
