const logout = () => {
  window.localStorage.removeItem("userToken");
  window.localStorage.removeItem("applicationToken");
  window.location.href = "/login";
};

export default logout;
