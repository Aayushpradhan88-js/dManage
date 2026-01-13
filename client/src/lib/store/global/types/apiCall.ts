import axios from "axios";

console.log("✅7 calling backend API")
const API = axios.create({
    baseURL: "http://localhost:6000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

export default API;