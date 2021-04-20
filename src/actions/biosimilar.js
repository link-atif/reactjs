import axios from "../axios";
const subId = localStorage.getItem("subscriptionID");

export default {
    getBiosimilars() {
        return axios.get(`https://roversmwdev.azurewebsites.net/Biosimilardrugs/GetBiosimilardrugs`, {
            headers: { "X-Subscription": subId },
        });
    },
    saveBiosimilar(body) {
        return axios.post(`https://roversmwdev.azurewebsites.net/Biosimilardrugs/SaveBiosimilardrugs`, body, {
            headers: { "X-Subscription": subId },
        })
    },
    updateBiosimilar(body) {
        return axios.post(`https://roversmwdev.azurewebsites.net/Biosimilardrugs/SaveBiosimilardrugs`, body, {
            headers: { "X-Subscription": subId },
        })
    },
    deleteBiosimilar(id) {
        return axios.delete(`https://roversmwdev.azurewebsites.net/Biosimilardrugs/DeleteBiosimilardrugs?id=${id}`, {
            headers: { "X-Subscription": subId },
        })
    },
    getBiosimilarDrugsUsed(start = 0, limit = 10, from = "", to = "") {
        return axios.get(`https://roversmwdev.azurewebsites.net/Biosimilardrugs/RefrenceDrugUsed?Start=${start}&Limit=${limit}&From${from}=&To=${to}`, {
            headers: { "X-Subscription": subId },
        });
    },
    getBiosimilarDrugUsedDetail(start = 0, limit = 10, referencesCode) {
        return axios.get(`https://roversmwdev.azurewebsites.net/Biosimilardrugs/RefrenceDrugUsedDetail?Start=${start}&Limit=${limit}&ReferenceCode=${referencesCode}&From=&To=`, {
            headers: { "X-Subscription": subId },
        });
    },
    getBiosimilarTotalSum(from = 0, to = 10) {
        return axios.get(`https://roversmwdev.azurewebsites.net/Biosimilardrugs/BiosimilarTotalSum?From=&To=`, {
            headers: { "X-Subscription": subId },
        });
    },
    getBiosimilarAdaptionRate(from = 0, to = 10) {
        return axios.get(`https://roversmwdev.azurewebsites.net/Biosimilardrugs/BiosimilarAdoptionRate?From=&To=`, {
            headers: { "X-Subscription": subId },
        });
    },
    getReferenceDrugTotal(from = 0, to = 10) {
        return axios.get(`https://roversmwdev.azurewebsites.net/Biosimilardrugs/ReferenceDrugTotalSum?From=&To=`, {
            headers: { "X-Subscription": subId },
        });
    }
}