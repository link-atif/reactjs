import axios from "../axios";
const subId = localStorage.getItem("subscriptionID");
const common = {
  cities() {
    return axios.get(`/city`);
  },
  citiesByState(body) {
    return axios.get(`/city/${body.country}/${body.state}`);
  },
  countries() {
    return axios.get(`/country`);
  },
  states() {
    return axios.get(`/state`);
  },
  getSubscriptionsRoles() {
    return axios.get(`/role`);
  },
  getSubscriptionPlans() {
    return axios.get(`/subscriptionplan`);
  },
  getActiveSubscription() {
    return axios.get("/subscription/1/0/5");
  },
  getClaimCounts() {
    return axios.get("/Analysis/ClaimCountByYear?Year=2020");
  },
  getMonthlyClaimCounts() {
    return axios.get("/Analysis/ClaimCountByMonth?Month=November&Year=2020");
  },
  getSingleSubscription() {
    let domain = localStorage.getItem("domainID");
    return axios.get(`/Customer/SubscriptionInfoByDomainId?DomainId=${domain}`);
  },
  getClaimsPayments(
    start,
    end,
    page,
    countPerPage,
    subscriptionID,
    payers,
    codes,
    claimStatusName,
    order,
    orderBy,
    filter
  ) {
    const domainID = localStorage.getItem("domainID");
    return axios.get(
      `/claimpayment/GetClaims?start=${page}&limit=${countPerPage}&from=${start}&to=${end}&payers=${payers}&cptCodes=${codes}&OrderBy=${orderBy}&Order=${order}&ClaimStatus=${claimStatusName}&Filter=${filter}`,
      {
        headers: { "X-Subscription": subscriptionID, "X-Domain": domainID },
      }
    );
  },
  getClaimDetail(id) {
    return axios.get(`/claimpayment/${id}`, {
      headers: { "X-Subscription": subId },
    });
  },
  getServicePayments(id) {
    return axios.get(`/servicepayment/${id}`, {
      headers: { "X-Subscription": subId },
    });
  },
  getServiceAdjustments(id) {
    return axios.get(`/servicepayment?servicePaymentIds=${id}`, {
      headers: { "X-Subscription": subId },
    });
  },
  deleteClaim(id) {
    return axios.delete(`/claimpayment/${id}`, {
      headers: { "X-Subscription": subId },
    });
  },
  getDashbaordKPIClaimSum(year) {
    return axios.get(`/Analysis/DashbaordKPIClaimSum?Year=${year}`, {
      headers: { "X-Subscription": subId },
    });
  },
  getDashbaordKPIClaimCount(type) {
    return axios.get(`/Analysis/DashbaordKPIClaimCount?Type=${type}`, {
      headers: { "X-Subscription": subId },
    });
  },
  getDashbaordKPIClaimBilledAndPaid(type) {
    return axios.get(`/Analysis/DashbaordKPIClaimBilledAndPaid?Type=${type}`, {
      headers: { "X-Subscription": subId },
    });
  },
  getDashbaordKPIReimbursement(month, year) {
    return axios.get(
      `/Analysis/DashbaordKPIReimbursement?Month=${month}&Year=${year}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  getDashbaordKPIPatientCount(type) {
    return axios.get(`/Analysis/DashbaordKPIPatientCount?Type=${type}`, {
      headers: { "X-Subscription": subId },
    });
  },
  getDashbaordKPIWriteoff(type) {
    return axios.get(`/Analysis/DashbaordKPIWriteoff?Type=${type}`, {
      headers: { "X-Subscription": subId },
    });
  },
  getClaimJCodeAmountDetail(claimId) {
    return axios.get(
      `ServicePayment/ClaimJCodeAmountDetail?ClaimPaymentId=${claimId}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  getClaimAdminAmountDetail(claimId) {
    return axios.get(
      `ServicePayment/ClaimAdminAmountDetail?ClaimPaymentId=${claimId}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  getClaimAncillaryAmountDetail(claimId) {
    return axios.get(
      `ServicePayment/ClaimAncillaryAmountDetail?ClaimPaymentId=${claimId}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  getClaimPreMedAmountDetail(claimId) {
    return axios.get(
      `ServicePayment/ClaimPreMedAmountDetail?ClaimPaymentId=${claimId}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  fileUpload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    return axios.post("http://127.0.0.1:8000/api/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  },
  getClaimRequest(
    offset,
    limit,
    start,
    end,
    orderBy,
    order,
    filter,
    payer,
    status,
    isCount
  ) {
    return axios.get(
      `/claimrequest/GetClaimRequests?start=${offset}&limit=${limit}&from=${start}&to=${end}&OrderBy=${orderBy}&Order=${order}&Filter=${filter}&payers=${payer}&ClaimStatus=${status}&IsCount=${isCount}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  getClaimService(claimId) {
    return axios.get(`/claimrequest/claimService/${claimId}`, {
      headers: { "X-Subscription": subId },
    });
  },
  getSingleClaimRequest(claimId) {
    return axios.get(`/claimrequest/${claimId}`, {
      headers: { "X-Subscription": subId },
    });
  },
  getClaimacknowledgment(id) {
    return axios.get(
      `/claimacknowledgment/${id}/00000000-0000-0000-0000-000000000000/00000000-0000-0000-0000-000000000000`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  getPatientAcknowledgment(id) {
    return axios.get(`/claimacknowledgment/${id}`, {
      headers: { "X-Subscription": subId },
    });
  },
  getJCodeRejectedDetailByCodeAndPayer(code, payer) {
    return axios.get(
      `CPTCode/GetJCodeRejectedDetailByCodeAndPayer?JCode=${code}&Payer=${payer}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  getPatientClaimTimeLine(pcn) {
    return axios.get(
      `https://roversmwdev.azurewebsites.net/claimpayment/GetPatientTimeLine/${pcn}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  getServiceLineAmountAndSumByDates(startDate, endDate) {
    return axios.get(
      `/denials/ServiceLineAmountAndSumByDates?from=${startDate}&to=${endDate}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
  updateCustomerInfo({ userEmail, firstName, lastName, organization, customerId }) {
    // const {}
    return axios.put(
      `https://roversmwdev.azurewebsites.net/customer/UpdateCustomerBasicInfo?CustomerId=${customerId}&FirstName=${firstName}&LastName=${lastName}&Email=${userEmail}&OrgName=${organization}`,
      {
        headers: { "X-Subscription": subId },
      }
    );
  },
};

export default common;
