import axios from "../axios";
const danialService = {
  getServiceLineAmountAndSumByDates(startDate, endDate) {
    return axios.get(
      `/denials/ServiceLineAmountAndSumByDates?from=${startDate}&to=${endDate}`
    );
  },
  getMonthWiseDenialsByDates(startDate, endDate) {
    return axios.get(
      `/denials/MonthWiseDenialsByDates?from=${startDate}&to=${endDate}`
    );
  },
  getPayersAndMonthWiseDenialsByDates(startDate, endDate) {
    return axios.get(
      `/denials/PayersAndMonthWiseDenialsByDates?from=${startDate}&to=${endDate}`
    );
  },

  //CPT CHART APIS
  getDenialsCPTCodes(startDate, endDate) {
    return axios.get(
      `/denials/DenialsCPTCodes?from=${startDate}&to=${endDate}`
    );
  },

  // REASONS CHART API
  getDenialsReasonsCodes(startDate, endDate) {
    return axios.get(
      `/denials/DenialsReasonsCodes?from=${startDate}&to=${endDate}`
    );
  },

  // PAYERS APIS
  getDenialsPayers(startDate, endDate) {
    return axios.get(`/denials/DenialsPayers?from=${startDate}&to=${endDate}`);
  },

  // DANIAL RATE API
  getDenialsRatePerByDates(startDate, endDate) {
    return axios.get(
      `/denials/DenialsRatePerByDates?from=${startDate}&to=${endDate}`
    );
  },
  // CPT LINE CHART
  getDenialsPayersCPTCode(startDate, endDate, payer) {
    return axios.get(
      `/denials/DenialsPayersCPTCode?from=${startDate}&to=${endDate}&Payer=${payer}`
    );
  },

  // CPT REASON CHART API
  getDenialsPayersCPTCodeReasonCode(startDate, endDate, payer, code) {
    return axios.get(
      `/denials/DenialsPayersCPTCodeReasonCode?from=${startDate}&to=${endDate}&Payer=${payer}&CPTCode=${code}`
    );
  },

  // REASON CODE API
  getDenialsReasonCode(startDate, endDate) {
    return axios.get(
      `/denials/DenialsReasonCode?from=${startDate}&to=${endDate}`
    );
  },
  getDenialsReasonCodeCPTCode(startDate, endDate, code) {
    return axios.get(
      `/denials/DenialsReasonCodeCPTCode?from=${startDate}&to=${endDate}&ReasonCode=${code}`
    );
  },
  getDenialsReasonCodeCPTCodePayer(startDate, endDate, code, cptCode) {
    return axios.get(
      `/denials/DenialsReasonCodeCPTCodePayer?from=${startDate}&to=${endDate}&ReasonCode=${code}&CPTCode=${cptCode}`
    );
  },
};

export default danialService;
