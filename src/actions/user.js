import axios from "../axios";

const user = {
  login(body) {
    return axios.get(`/user/${body.email}/${body.password}`);
  },
  verifyUser(body) {
    return axios.get(
      `/user/VerifyMFA/?email=${body.email}&userid=${body.verificationCode}&code=${body.code}`
    );
  },
  forgotPassword(body) {
    return axios.get(`/password/${body.email}`);
  },
  resetPassword(body) {
    return axios.post(`/password`, {
      code: body.code,
      password: body.password,
    });
  },
  register(body) {
    return axios.post(`/customer`, body);
  },
  getAllCustomers(body) {
    return axios.get(`/customer/${body.status}/${body.start}/${body.end}`);
  },

  getAllCustomerLicence() {
    return axios.get(`/Customer/CustomerLicence`);
  },

  getJCode() {
    return axios.get(`CPTCode/GetJCode`);
  },

  AddJCode(body) {
    return axios.post(`CPTCode/SaveJCode`, body);
  },

  updateJCode(body) {
    return axios.post(`CPTCode/SaveJCode`, body);
  },

  deleteJCode(body) {
    return axios.delete(`CPTCode/DeleteJCode?JCodeId=${body.jCodeId}`);
  },

  getAdminCode() {
    return axios.get(`CPTCode/GetAdminCode`);
  },

  addAdminCode(body) {
    return axios.post(`CPTCode/SaveAdminCode`, body);
  },

  deleteAdminCode(body) {
    return axios.delete(
      `CPTCode/DeleteAdminCode?AdminCodeId=${body.cAdminCodeId}`
    );
  },

  updateAdminCode(body) {
    return axios.post(`CPTCode/SaveAdminCode`, body);
  },

  getAllRoles(body) {
    return axios.get(`/role`);
  },

  getAllUsers(domainId) {
    return axios.get(`/user`);
  },
  createUser(body) {
    return axios.post(`/user`, {
      firstName: body.firstname,
      lastName: body.lastname,
      email: body.email,
      contactNo: body.contactNo,
      displayName: body.displayname,
      password: body.password,
      Roles: body.roles,
      domainID: body.domainID,
      mfaDeliverChoice: body.mfaDeliverChoice,
      Subscriptions: [{ subscriptionId: body.Subscriptions }],
    });
  },
  updateUser(body) {
    return axios.put("/user", body);
  },
  updateCustomer(body) {
    return axios.put(`/customer`, {
      customerId: body.customerId,
      firstName: body.firstname,
      lastName: body.lastname,
      email: body.email,
      contactNo: body.contactNo,
      orgName: body.orgName,
      domainId: body.domainId,
      Addresses: body.Addresses,
      Subscriptions: body.Subscriptions,
    });
  },
  changePassword(body) {
    return axios.put(
      `/password?userId=${body.id}&newPassword=${body.password}&email=${body.email}`
    );
  },
  deleteCustomer(body) {
    return axios.delete(`/customer/${body.customer_id}`);
  },
  deleteUser(user_id) {
    return axios.delete(`/user/${user_id}`);
  },
  getUser(user_id) {
    return axios.get(`/user/${user_id}`);
  },
  updateProfile(body) {
    return axios.post(
      `/user/UpdateUserProfile/?UserId=${body.UserId}&FirstName=${body.FirstName}&LastName=${body.LastName}&ContactNo=${body.ContactNo}&email=${body.email}`
    );
  },
  sendVerificationCode(email) {
    return axios.post(`/user/SendMFACode?email=${email}`);
  },
  updateMcfChoise(email, value) {
    return axios.post(
      `/user/UpdateUserMFAChoice?email=${email}&mfachoice=${value}`
    );
  },
  adminResetPassword(body) {
    return axios.put(
      `https://roversmwdev.azurewebsites.net/password?email=${body.email}&newPassword=${body.password}`
    );
  },

  updateLicense(body) {
    return axios.put(
      `https://roversmwdev.azurewebsites.net/customer/UpdateSeats?SubcriptionId=${body.subscriptionId}&Seats=${body.seats}`
    );
  },
  savePreferences(body) {
    let queryparams = `UserId=${body.userId}&NoOfRecordInTable=${body.NoOfRecordInTable}&Theme=${body.Theme}&Navigation=${body.Navigation}`;
    return axios.post(`https://roversmwdev.azurewebsites.net/user/SaveUserPreference?${queryparams}`)
  }
};

export default user;
