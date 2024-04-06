import { request } from "./axiosInstance";
import { UserInfoInterface } from "../_helpers";

export const register = async (payload: UserInfoInterface) => {
    const results = await request.post("/user/registration/", payload);
    return results.data;
};

export const isAccountAlreadyActive = async (accountID: string) => {
    const results = await request.get(`/auth/check/active-account/id=${accountID}/`);
    return results.data;
};

export const resendActivationLink = async (payload: UserInfoInterface) => {
    const results = await request.post("/auth/re-send/activation-link/", payload);
    return results.data;
};

export const activatingAccount = async (token: string | undefined) => {  
    const results = await request.get(`/auth/activating-account/token=${token}/`);
    return results.data;
};

export const sendPasswordReccoveryLink = async (payload: UserInfoInterface) => {
    const results = await request.post("/auth/send/password-recovery-link/", payload);
    return results.data;
};

export const checkLinkValidity = async (token: string | undefined) => {
    const response = await request.get(`/auth/check-link/token==${token}`);        
    return response.data;
};

export const resetPassword = async (payload: UserInfoInterface) => {
    const results = await request.put("/auth/reset-password/", payload);      
    return results.data;
};

export const login = async (payload: UserInfoInterface) => {
    const results = await request.post("/auth/login/", payload);
    return results.data;
};

export const logout = async () => {
    const results = await request.get("/auth/logout/");
    return results.data;
};