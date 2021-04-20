import axios from "../axios";
const subId = localStorage.getItem("subscriptionID");
const report = {
  getCPTCode() {
    return axios.get(`/CPTCode/GetCPTCode`, {
      headers: { "X-Subscription": subId },
    });
  },
  getReasonCode() {
    return axios.get(`/Report/GetReasonCode`, {
      headers: { "X-Subscription": subId },
    });
  },
  getCAS() {
    return axios.get(`/Report/GetCAS`, {
      headers: { "X-Subscription": subId },
    });
  },
  getDrugRejected(start, limit, from, to) {
    return axios.get(
      `/CPTCode/GetDrugRejected?Start=${start}&Limit=${limit}&From=${from}&To=${to}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  denialExplorer(
    type,
    start,
    limit,
    startDate,
    endDate,
    cpt,
    status,
    reason,
    cas
  ) {
    return axios.get(
      `/Report/CodeExplorer?Type=${type}&Start=${start}&Limit=${limit}&From=${startDate}&To=${endDate}&CPTCode=${cpt}&ClaimStaus=${status}&DenialReasonCode=${reason}&CAS=${cas}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
};

export default report;
