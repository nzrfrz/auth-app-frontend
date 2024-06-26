import { useContext, useEffect, useMemo } from "react";

import { useQueryHook } from "../hooks";
import { UserInfoInterface, pusher } from "../_helpers";
import { getUserProfile, logout } from "../api";
// import { getUserProfile } from "../api";
import { GlobalContext } from "../context/contextCreate";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
// import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    const cookie = document.cookie;
    const navigateTo = useNavigate();
    const { setUserInfo, openNotification } = useContext(GlobalContext);
    // const { setUserInfo } = useContext(GlobalContext);
    // console.log("WS PATH: ", import.meta.env.VITE_WS_BASE_PATH);    

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
        const channel = pusher.subscribe("userAuth");
        channel.bind("login-event", (data: any) => {
            if (loginCredentialValue?.id === data?.message?.id && loginCredentialValue?.refreshToken !== data?.message?.refreshToken) handleLogout();
            // console.log("SUBS PUSHER: ", data?.message?.id);
        });

        return () => {
            channel.unbind("login-event");
        }
    }, []);

    /*
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
    */

    useEffect(() => {
        setUserInfo(userSelfInfoResponse?.data?.data as UserInfoInterface);
    }, [userSelfInfoResponse]);

    if (loginCredentialValue?.refreshToken === undefined) return ( <Navigate to={"/login"} replace state={{ from: location.pathname }} /> );
    else return ( <Outlet /> );
};