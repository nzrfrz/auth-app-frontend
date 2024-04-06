import { useMemo } from "react";
import { Outlet, Navigate } from "react-router-dom";

export const PublicRoute = () => {
    const cookie = document.cookie;
    console.log(cookie);  
    // console.log("LOAD PUBLIC ROUTE", import.meta.env.VITE_WS_BASE_PATH);

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

    if (loginCredentialValue?.refreshToken === undefined) return ( <Outlet /> );
    else return ( <Navigate to={"/"} replace={true} /> );
};