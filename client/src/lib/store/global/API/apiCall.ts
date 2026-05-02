'use client'

import axios from "axios"

const API = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    withCredentials: true
})

const APIWithToken = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
})

APIWithToken.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("user_token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }

    config.headers["Content-Type"] = "application/json"
    config.headers.Accept = "application/json"

    return config
})

export { API, APIWithToken }
