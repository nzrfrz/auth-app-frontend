import { useEffect } from "react";
import { activatingAccount } from "../api";
import { useQuery } from "@tanstack/react-query";
import { ResponseInterface } from "../_helpers";
import { useNavigate, useParams } from "react-router-dom";

import { FullPageNotif, LoadingSandGlass, MyButton } from "../_components";

export const ActivatingAccount = () => {
    const navigateTo = useNavigate();
    
    // get the token from email link send from backend
    const params = useParams<{ token: string }>();

    const fetchResults: ResponseInterface = useQuery({
        queryKey: ["accountActivation"],
        queryFn: () => activatingAccount(params?.token || ""),
    });

    const isLoading = fetchResults?.isLoading;
    const successStatus = fetchResults?.data?.status;
    const successMessage = fetchResults?.data?.message;
    const errorStatus = fetchResults?.error?.response?.data?.status;
    const errorMessage = fetchResults?.error?.response?.data?.message;

    useEffect(() => {
        if (successStatus === 200 || (errorStatus === 400 && errorMessage === "Account already active")) {
            setTimeout(() => {
                return navigateTo("/login", { replace: true });
            }, 500);
        }
    }, [successStatus, errorStatus, errorMessage]);

    switch (true) {
        case isLoading === true:
            return (
                <LoadingSandGlass
                    height={"100vh"}
                    loadingText="Please wait while we are activating your account"
                />
            );
            case isLoading === false && successStatus === 200 && successMessage === "Account has been activated":
            case isLoading === false && errorStatus === 400 && errorMessage === "Account already active":
                return (
                    <FullPageNotif 
                        type="success"
                        text={
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <span style={{ fontSize: "1.2rem", textAlign: "center" }}>Your account has been activated, redirecting to Login</span>
                            </div>
                        }
                    />
                );
            case isLoading === false && errorStatus === 404 && errorMessage === "Account not found":
                return (
                    <FullPageNotif 
                        type="error"
                        text={
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                                <span style={{ fontSize: "1.2rem", textAlign: "center" }}>Cannot found your account, please re-register your account</span>
                                <MyButton 
                                    text="Register"
                                    colorType="default"
                                    onClick={() => navigateTo("/register", { replace: true })}
                                />
                            </div>
                        }
                    />
                );
        default:
            return (
                <FullPageNotif 
                    type="error"
                    text={
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "1.2rem", textAlign: "center" }}>Your link has expired</span>
                        </div>
                    }
                />
            );
    };
};