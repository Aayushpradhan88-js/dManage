import axios from "axios";

axios.create({
    baseURL: 'http://localhost:4000/api',
    headers:{
        "Content-Type":"application/json"
    }
})