import axios from "../axios";
const subId = localStorage.getItem("subscriptionID");
const dashboardService = {
  getRCAList() {
    return axios.get(`Analysis/GetRCAList`, {
      headers: { "X-Subscription": subId },
    });
  },
  getRCAData(item, type, start, limit, from, to) {
    return axios.get(
      `/Analysis/GetRCADATA?rcacename=${item}&result=${type}&start=${start}&limit=${limit}&from=${from}&to=${to}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
};

export default dashboardService;
