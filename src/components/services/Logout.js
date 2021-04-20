const logout = () => {
  window.localStorage.removeItem("rememberMe");
  window.localStorage.removeItem("userToken");
  window.location.href = "/";
};

export default logout;
