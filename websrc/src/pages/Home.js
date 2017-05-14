// @flow

import React, { Component } from "react";
import { Link, redirect } from "../routing/Router";

import TopBar from "../components/TopBar";
import HeaderBar from "../components/HeaderBar";

// import svg icons
import TaxDeviceIcon from "../svg/taxdevice.svg";
import MerchantsIcon from "../svg/merchants.svg";

import UsersIcon from "../svg/users.svg";

// import page views
import MerchantPageView from "../pageviews/Merchants";
import TaxDeviceView from "../pageviews/TaxDevices";
import SummaryView from "../pageviews/Summary";

// Notification
import { singleNote, Notifier } from "../stores/Notifications";
import userStore from "../stores/users"; 

type HomeProps = {
  match: { params: Array<string> }
};

export default class Home extends Component {
  state: {
    urlMatch: { page: string, option: string }
  };
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      urlMatch: { page: "", option: "" }
    };
  }
  componentWillMount() {
    if (!userStore.user) {
      redirect("/accounts/login")
    }
  }
  componentDidMount() {
    this.urlMatch();
  }
  componentWillReceiveProps(props: HomeProps) {
    this.urlMatch(props);
  }
  urlMatch(props: ?HomeProps) {
    let p = props || this.props;
    let [page, option, id] = p.match.params;
    this.setState({ urlMatch: { page, option, id } });
  }
  renderPage() {
    let params = this.state.urlMatch;
    let option = params.option;

    switch (params.page) {
      case "merchants":
        return <MerchantPageView match={params} />;
      case "taxdevices":
        return <TaxDeviceView match={{ option }} />;
      default:
        return <SummaryView match={{ option }} />;
    }
  }
  headerCards() {
    return [
      {
        content: "Home",
        onClick: () => {
          redirect("/");
        }
      },
      {
        icon: MerchantsIcon,
        content: "Merchants",
        onClick: () => {
          redirect("/merchants");
        }
      },
      {
        icon: TaxDeviceIcon,
        content: "Tax Devices",
        onClick: () => {
          redirect("/taxdevices");
        }
      },
      {
        icon: UsersIcon,
        content: "Users",
        onClick: () => {
          redirect("/users");
        }
      }
    ];
  }
  render() {
    return (
      <div className="home">
        <Notifier singleNote={singleNote} />
        <TopBar title="VAT Interface" />
        <HeaderBar cards={this.headerCards()} />
        <div className="home-content">{this.renderPage()} </div>

        <style jsx>{`
            .home-content {
              display: flex;
              width: 100vw;
              min-height: 100px;
              margin-top: 30px;
            }
          `}</style>
      </div>
    );
  }
}
