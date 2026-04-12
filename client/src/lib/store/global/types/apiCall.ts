'use client'

import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    withCredentials: true
});

const APIWithToken = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Authorization": typeof window !== 'undefined' ? localStorage.getItem("user_token") : null,
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    withCredentials: true,
});

export { API, APIWithToken };