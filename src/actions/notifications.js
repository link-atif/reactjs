import axios from "../axios";
axios.defaults.headers["X-Subscription"] = localStorage.getItem("subscriptionID");
axios.defaults.headers["X-Domain"] = localStorage.getItem("domainID");
const notifications = {
  getNotifications(userId) {
    //https://roversmwdev.azurewebsites.net/notification/1/0/5
    //1 means read message
    //0 means start page
    //5 means limit page
    // return axios.get(`/notification/0/0/10`);
    return axios.get(`/notification/0/0/5/${userId}`);
  },
  sendNotification(body) {
    return axios.post(
      `/notification?title=${body.title}&message=${body.message}&userId=${body.userId}&subscriptionWithDomainIds=${body.subscriptionWithDomainIds}&roleIds=${body.roleIds}`,
      {
        title: body.title,
        message: body.message,
        userId: body.userId,
        subscriptionIds: body.subscriptionIds,
        roleIds: body.roleIds
      }
    );
  },
  readAllNotification(body) {

    return axios.post(`/notification/MarkAllAsRead?userid=${body.userId}`);
  },
  getAllTimeNotifications() {
    return axios.get("/notification/1/0/20");
  },
};

export default notifications;
