import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = "http://localhost:5000";
const userCookie = Cookies.get("user");
const user = userCookie && JSON.parse(Cookies.get("user"));
const TOKEN = user?.accessToken;

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", token: `Bearer ${TOKEN}` },
  //   withCredentials: true, // includes cookies with the request
});

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});
