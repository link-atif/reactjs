// import { axios } from "axios";
import axios from "axios";

const applicationToken = window.localStorage.getItem("applicationToken");
const userToken = window.localStorage.getItem("userToken");
var isRememberChecked = localStorage.getItem("rememberMe");
const instance = axios.create({
  baseURL: "https://roversmwdev.azurewebsites.net/",
  paramsSerializer: function (params) {
    return params;
  },
});

instance.interceptors.request.use((x) => {
  // to avoid overwriting if another interceptor
  // already defined the same object (meta)
  x.meta = x.meta || {};
  x.meta.requestStartedAt = new Date().getTime();
  return x;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response !== null &&
      typeof error.response !== "undefined" &&
      error.response.status === 401
    ) {
      if (
        typeof isRememberChecked != "undefined" &&
        typeof isRememberChecked != "object" &&
        isRememberChecked !== "false" &&
        isRememberChecked != "null"
      ) {
        axios.get(`https://roversmwdev.azurewebsites.net/token`).then((res) => {
          localStorage.setItem("applicationToken", res.data.data);
          setTimeout(() => {
            window.location.reload();
          }, [800]);
        });
      } else {
        window.localStorage.removeItem("applicationToken");
        window.location.href = "/login";
      }
      // logout();
      // localStorage.setItem("401", "logout and redirect=====");
      // window.localStorage.removeItem("applicationToken");
      // // window.localStorage.removeItem("userToken");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
if (applicationToken) {
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${applicationToken}`;
}
if (userToken) {
  instance.defaults.headers.common["userToken"] = userToken;
}

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.put["Content-Type"] = "application/json";
instance.defaults.headers.get["Content-Type"] = "application/json";
instance.defaults.headers.get["X-Version"] = "1.0";
instance.defaults.headers.get["X-Domain"] = localStorage.getItem("domainID"); //"datarovers";
instance.defaults.headers.put["X-Version"] = "1.0";
instance.defaults.headers.put["X-Domain"] = localStorage.getItem("domainID"); //"datarovers";
instance.defaults.headers.delete["X-Version"] = "1.0";
instance.defaults.headers.delete["X-Version"] = "1.0";
instance.defaults.headers.delete["X-Domain"] = localStorage.getItem("domainID"); //"datarovers";
export default instance;
