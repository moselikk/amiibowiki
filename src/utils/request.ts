import axios from "axios";
import settings from "@/settings";

const service = axios.create({
  baseURL: settings.amiiboApi,
  timeout: 5000,
});

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.status == 200) {
      return res;
    } else {
      alert("出错了");
    }
  },
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);

export default service;
