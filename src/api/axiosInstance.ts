import axios from "axios";

let alreadyLogout = false;
const devBasePath = import.meta.env.VITE_BASE_PATH;

export const request = axios.create({
    withCredentials: true,
    baseURL: devBasePath,
    // timeout: 6000
});

request.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        // console.log("REQUEST INTERCEPT ERROR: ", error);
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {
        alreadyLogout = false;
        // console.log("ALREADY LOGOUT: ", alreadyLogout);
        return response;
    },
    async (error) => {
        // console.log("ALREADY LOGOUT: ", alreadyLogout);
        // console.log("RESPONSE INTERCEPT ERROR: ", error);
        if (error?.response?.status === 401) return await request.get("/auth/renew-access-token/");
        else if (error?.response?.status === 403 && alreadyLogout === false) {
            alreadyLogout = true;
            await request.get("/user/logout/");
            window.history.pushState({}, "", "/login");
            // return false;
        }
        else return Promise.reject(error);
    }
);