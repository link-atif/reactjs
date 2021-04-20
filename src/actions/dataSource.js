import { string } from "yup";
import axios from "../axios";
axios.defaults.headers["X-Subscription"] = localStorage.getItem("subscriptionID");
axios.defaults.headers["X-Domain"] = localStorage.getItem("domainID");

const formateEscapeChar = (payload) => {
    let data = JSON.stringify(payload)
        .replace(/\\\\/g, "\\")
        .replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f")

    return data;
}

const DataSource = {
    getSources() {
        return axios.get(`/datasource/GetSourceTypes`);
    },
    getSyncFrequencies() {
        return axios.get(`/datasource/GetFrequencyTypes`);
    },
    testConnection(body) {

        // let data = JSON.stringify(body)
        //     .replace(/\\\\/g, "\\")
        //     .replace(/\\n/g, "\\n")
        //     .replace(/\\'/g, "\\'")
        //     .replace(/\\"/g, '\\"')
        //     .replace(/\\&/g, "\\&")
        //     .replace(/\\r/g, "\\r")
        //     .replace(/\\t/g, "\\t")
        //     .replace(/\\b/g, "\\b")
        //     .replace(/\\f/g, "\\f")

        return axios.post(`/datasource/FTPConnect`, body);
    },
    createDataSource(body) {
        // let data = JSON.stringify(body)
        //     .replace(/\\\\/g, "\\")
        //     .replace(/\\n/g, "\\n")
        //     .replace(/\\'/g, "\\'")
        //     .replace(/\\"/g, '\\"')
        //     .replace(/\\&/g, "\\&")
        //     .replace(/\\r/g, "\\r")
        //     .replace(/\\t/g, "\\t")
        //     .replace(/\\b/g, "\\b")
        //     .replace(/\\f/g, "\\f")

        return axios.post(`/datasource/CreateFTPDataSource`, body);
    },
    getDataSources() {
        return axios.get(`/datasource/GetFTPDataSources`);
    },
    deleteDataSource(sourceId) {
        return axios.delete(`/datasource/deleteftpsource/${sourceId}`)
    },

    updateDataSource(body) {
        let data = formateEscapeChar(body);
        return axios.post(`/datasource/UpdateFTPDataSource`, data);
    },
    getDataSourcesErrors(sourceId) {
        return axios.get(`https://roversmwdev.azurewebsites.net/datasource/GetSourceErrors/${sourceId}`);
    }

};

export default DataSource;