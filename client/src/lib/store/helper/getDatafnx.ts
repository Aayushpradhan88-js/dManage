import axios from "axios";

// axios.create()          -- valid option
// axios.create(undefined) -- valid option
const API = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

export default API;