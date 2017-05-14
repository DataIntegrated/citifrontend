// @flow

import { request, host, wrapError } from "../util/backend";
import { observable } from "mobx";

import { singleNote } from "./Notifications";

class MerchantStore {
  @observable list: Array<Object>;
  @observable singleSummary: Object;

  constructor() {
    this.fetchMerchants();
    this.list = [];
  }

  async fetchSingleMerchantSummary(pin: string, year: number, month: number) {
    try {
      year = year || new Date().getFullYear();
      month = month || new Date().getMonth() + 1;

      let url =
        "https://revenue.eu-gb.mybluemix.net/api/transaction/merchantsummary";

      let json = await wrapError(request(url, "POST", { year, month, pin }));
      this.singleSummary = json;
    } catch (err) {
      singleNote.new("error", `Merchants: ${err.message}`);
      console.error("fetching merchants", err);
    }
  }

  async fetchMerchants() {
    try {
      let url = "https://revenue.eu-gb.mybluemix.net/api/merchant/list";
      let res = await request(url, "get");
      let json = await res.json();
      this.list = json;
    } catch (err) {
      singleNote.new("error", `Merchants: ${err.message}`);
      console.error("fetching merchants", err);
    }
  }
}

const merchantStore = new MerchantStore();

export default merchantStore;
export { MerchantStore };
