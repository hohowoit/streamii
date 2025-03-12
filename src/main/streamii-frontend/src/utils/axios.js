import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청을 보낼 때 JWT 토큰을 자동으로 추가하는 interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답을 받을 때, 만료된 토큰이면 로그아웃 처리
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("토큰이 만료되어 로그아웃 처리합니다.");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
