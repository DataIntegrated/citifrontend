// @flow

import { request, host } from "../util/backend";
import { observable } from "mobx";

class TaxDeviceStore {
  @observable list: Array<Object>;

  constructor() {
    this.fetchTaxDevices();
    this.list = [];
  }

  async fetchTaxDevices() {
    try {
      let url = "https://revenue.eu-gb.mybluemix.net/api/taxdevice/list";
      let res = await request(url, "get");
      let json = await res.json();
      this.list = json;
    } catch (err) {
      console.error("fetching merchants", err);
    }
  }
}

const store = new TaxDeviceStore();

export default store;
export { TaxDeviceStore };
