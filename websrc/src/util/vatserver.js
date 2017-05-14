// @flow
import { request, wrapError } from "./backend";

import { singleNote } from "../stores/Notifications";

export function createNewMerchant(data: Object) {
  let url = "https://revenue.eu-gb.mybluemix.net/api/merchant/create";
  return wrapError(request(url, "POST", data));
}

export function createNewTaxDevice(data: Object) {
  let url = "https://revenue.eu-gb.mybluemix.net/api/taxdevice/create";
  return wrapError(request(url, "POST", data));
}
