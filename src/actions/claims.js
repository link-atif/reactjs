import axios from "../axios";
const subId = localStorage.getItem("subscriptionID");
const claims = {
  getClaimSumLastFiveYear(payers = "") {
    return axios.get(`/Analysis/ClaimSumLastFiveYear?Payers=${payers}`);
  },
  getClaimSumByYear(year, payers = "") {
    return axios.get(`/Analysis/ClaimSumByYear?Year=${year}&payer=${payers}`);
  },
  getClaimSumByMonth(month, year, payers = "") {
    return axios.get(
      `/Analysis/ClaimSumByMonth?Month=${month}&Year=${year}&payer=${payers}`
    );
  },
  getClaimCountLastFiveYear(payers = "") {
    return axios.get(`/Analysis/ClaimCountLastFiveYear?Payers=${payers}`);
  },
  getClaimCountByYear(year, payers = "") {
    return axios.get(
      `/Analysis/ClaimCountByYear?Year=${year}&Payers=${payers}`
    );
  },
  getClaimCountByMonth(month, year, payers = "") {
    return axios.get(
      `/Analysis/ClaimCountByMonth?Month=${month}&Year=${year}&Payers=${payers}`
    );
  },
  getDashboardAdminCodeLastFiveYear() {
    return axios.get("/Analysis/DashboardAdminCodeLastFiveYear");
  },
  getDashboardAdminCodeByYear(year) {
    return axios.get(`/Analysis/DashboardAdminCodeByYear?Year=${year}`);
  },
  getDashboardAdminCodeByMonth(month, year) {
    return axios.get(
      `/Analysis/DashboardAdminCodeByMonth?MonthName=${month}&Year=${year}`
    );
  },
  getDashboardJCodeLastFiveYear() {
    return axios.get("/Analysis/DashboardJCodeLastFiveYear");
  },
  getDashboardJCodeByYear(year) {
    return axios.get(`/Analysis/DashboardJCodeByYear?Year=${year}`);
  },
  getDashboardJCodeByMonth(month, year) {
    return axios.get(
      `/Analysis/DashboardJCodeByMonth?MonthName=${month}&Year=${year}`
    );
  },
  getDashboardAncillaryLastFiveYear() {
    return axios.get("/Analysis/DashboardAncillaryLastFiveYear");
  },
  getDashboardAncillaryByYear(year) {
    return axios.get(`/Analysis/DashboardAncillaryByYear?Year=${year}`);
  },
  getDashboardAncillaryByMonth(month, year) {
    return axios.get(
      `/Analysis/DashboardAncillaryByMonth?MonthName=${month}&Year=${year}`
    );
  },
  getDashboardPreMedLastFiveYear() {
    return axios.get("/Analysis/DashboardPreMedLastFiveYear");
  },
  getDashboardPreMedByYear(year) {
    return axios.get(`/Analysis/DashboardPreMedByYear?Year=${year}`);
  },
  getDashboardPreMedByMonth(month, year) {
    return axios.get(
      `/Analysis/DashboardPreMedByMonth?MonthName=${month}&Year=${year}`
    );
  },
  getDashboardCodesAmountByYear(year = "2019", payers = "") {
    return axios.get(
      `Analysis/DashboardCodesAmountByYear?Year=${year}&Payers=${payers}`
    );
  },
  getDashboardCodesAmountByType(year = "", type = "") {
    return axios.get(
      `Analysis/DashboardCodesAmountByType?Year=${year}&Payers&CodeType=${type}`
    );
  },
  getPayerList() {
    return axios.get("Analysis/PayerList");
  },
  getDashboardClaimAmountByPayer(payers) {
    return axios.get(`Analysis/DashboardClaimAmountByPayer?Payers=${payers}`);
  },
  getServicePayers() {
    return axios.get("ServicePayment/PayerList", {
      headers: { "X-Subscription": subId },
    });
  },
  getCptJcode() {
    return axios.get("/CPTCode/GetOnlyJCode", {
      headers: { "X-Subscription": subId },
    });
  },
  getCptAdminCode() {
    return axios.get("/CPTCode/GetAdminCode", {
      headers: { "X-Subscription": subId },
    });
  },
  getAncillaryCode() {
    return axios.get("/CPTCode/GetAncillaryCode", {
      headers: { "X-Subscription": subId },
    });
  },
  getPremedCode() {
    return axios.get("/CPTCode/GetPreMedCode", {
      headers: { "X-Subscription": subId },
    });
  },
  getRejectedCodes(noOfRecord, start, limit, startDate = null, endDate = null) {
    return axios.get(
      `/CPTCode/GetJCodeRejected?NoOfRecords=${noOfRecord}&Start=${start}&Limit=${limit}&From=${startDate}&To=${endDate}`
    );
  },
  getClaimLinkage(id) {
    return axios.get(`/claimrequest/ClaimLinkage/${id}`, {
      headers: { "X-Subscription": subId },
    });
  },
  getJCodeRejectedDetailByJCode(code, startDate, endDate) {
    return axios.get(
      `/CPTCode/GetJCodeRejectedDetailByJCode?JCode=${code}&From=${startDate}&To=${endDate}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  getJCodeRejectedDetailByJCodeDenialReasonCode(
    reasonCode,
    payer,
    code,
    startDate,
    endDate
  ) {
    return axios.get(
      `/CPTCode/GetJCodeRejectedDetailByJCodeDenialReasonCode?JCode=${code}&DenialReasonCode=${reasonCode}&Payer=${payer}&From=${startDate}&To=${endDate}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  getJCodeRejectedDetailByJCodeDenialReasonCodePayer(
    code,
    reasonCode,
    payer,
    startDate,
    endDate,
    start,
    limit
  ) {
    return axios.get(
      `/CPTCode/GetJCodeRejectedDetailByJCodeDenialReasonCodePayer?JCode=${code}&DenialReasonCode=${reasonCode}&Payer=${payer}&From=${startDate}&To=${endDate}&Start=${start}&Limit=${limit}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  getClaimsCPTCodes(start, end, payers, status) {
    return axios.get(
      `claimpayment/GetClaimsCPTCodes?from=${start}&to=${end}&payers=${payers}&ClaimStatus=${status}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  getPatientClaims(start, end, controlNo) {
    return axios.get(
      `/claimpayment/GetPatientClaims?start=${start}&limit=${end}&PatientControlNo=${controlNo}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  getDashboardAllCodeAmount(year = "2019", Payers = "") {
    return axios.get(
      `https://roversmwdev.azurewebsites.net/Analysis/DashboardAllCodesAmount?Year=${year}&Payers=${Payers}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  getClaimRules() {
    return axios.get(
      `https://roversmwdev.azurewebsites.net/CPTCode/GetRCAClaimEngine`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  openClaimRequestCards() {
    return axios.get(
      `https://roversmwdev.azurewebsites.net/claimrequest/OpenClaimRequestCards`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  acceptedClaimRequestCards() {
    return axios.get(
      `https://roversmwdev.azurewebsites.net/claimrequest/AcceptedClaimRequestCards`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  rejectedClaimRequestCards() {
    return axios.get(
      `https://roversmwdev.azurewebsites.net/claimrequest/RejectedClaimRequestCards`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
};

export default claims;
