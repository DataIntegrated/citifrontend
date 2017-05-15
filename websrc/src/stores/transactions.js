// @flow

import { request, host } from "../util/backend";
import { observable, computed } from "mobx";

import { singleNote } from "./Notifications";

let summaryUrl = " https://revenue.eu-gb.mybluemix.net/api/transaction/summary";
let rangeUrl = "https://revenue.eu-gb.mybluemix.net/api/transaction/range";

function datef(year: number, m: number, d: number) {
  return `${year}-${m}-${d}`;
}

function dateTodayf() {
  let date = datef(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );
  return date;
}

class TransactionStore {
  todaySales: number;

  @observable todayTax: Object;
  @observable today: Array<Object>;

  @computed get todaySales(): number {
    let sum: number = 0;
    let r = this.today.forEach(item => {
      let { amount1, amount2, amount3, amount4 } = item;
      let s = amount1 + amount2 + amount3 + amount4;
      sum = sum + s;
    });
    return sum;
  }

  constructor() {
    this.today = [];
    this.todayTax = {};

    this.todaysTransactions();
    this.todaysTax();
    this.pollTodaysTransactions();
  }

  async todaysTransactions() {
    let url = rangeUrl;
    let datef = dateTodayf();
    let data = { start: datef, stop: datef };
    let res = await request(url, "post", data);
    let json = await res.json();
    this.today = json;
    console.log(json)
  }

  pollTodaysTransactions() {
    setInterval(() => {
      this.todaysTransactions();
    }, 2500);
  }

  async todaysTax() {
    let url = summaryUrl;
    let datef = dateTodayf();
    let data = { start: datef, stop: datef };
    let res = await request(url, "post", data);
    let json = await res.json();
    this.todayTax = json;
  }
}

var store = new TransactionStore();
export default store;
export { TransactionStore };
