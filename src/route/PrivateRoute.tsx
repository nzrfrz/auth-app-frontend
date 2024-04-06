import { useContext, useEffect, useMemo } from "react";

import { useQueryHook } from "../hooks";
import { UserInfoInterface } from "../_helpers";
import { getUserProfile, logout } from "../api";
import { GlobalContext } from "../context/contextCreate";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export const PrivateRoute = () => {
    const cookie = document.cookie;
    const navigateTo = useNavigate();
    const { setUserInfo, openNotification } = useContext(GlobalContext);

    const userSelfInfoResponse = useQueryHook(["userSelfInfo"], getUserProfile(), false);    

    const loginCredentialValue = useMemo(() => {
        const cookieValue = cookie.split(";").filter((data) => data.includes(import.meta.env.VITE_LOGIN_CREDENTIAL_COOKIE_NAME)).toString().split("=")[1];
        const decodedCookie = decodeURIComponent(cookieValue);
        const tempValue = decodedCookie.split(import.meta.env.VITE_COOKIE_VALUE_SEPARATOR);
        const finalValue = {
            id: tempValue[0],
            refreshToken: tempValue[1],
        };
        return finalValue;
    }, [cookie]);

    const handleLogout = async () => {
        try {
            await logout();
            navigateTo("/login", { replace: true });
            openNotification("error", "logout", "Multiple Login", "Logged in on other device");
        } catch (error) {
            navigateTo("/login", { replace: true });
            openNotification("error", "logout", "Expired", "Your session is expired, please login again");
        }
    };

    useEffect(() => {
        const socketClient = new WebSocket(`${import.meta.env.VITE_WS_BASE_PATH}`);
        socketClient.addEventListener("message", (message: any) => {
            const messageObject = JSON.parse(message.data);
            if (loginCredentialValue?.id === messageObject.id && loginCredentialValue?.refreshToken !== messageObject.refreshToken) handleLogout();
        });
                
        return () => {
            socketClient.close();
        };
    }, []);

    useEffect(() => {
        setUserInfo(userSelfInfoResponse?.data?.data as UserInfoInterface);
    }, [userSelfInfoResponse]);

    if (loginCredentialValue?.refreshToken === undefined) return ( <Navigate to={"/login"} replace state={{ from: location.pathname }} /> );
    else return ( <Outlet /> );
};