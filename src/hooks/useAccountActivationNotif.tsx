import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ResponseInterface, UserInfoInterface } from "../_helpers";
import { isAccountAlreadyActive, resendActivationLink } from "../api";

export const useAccountActivationNotif = () => {
    const totalTime = 30;
    const { state } = useLocation();
    const navigateTo = useNavigate();

    const [secondsLeft, setSecondsLeft] = useState<number>(30);
    
    const checkisAccountActive = useQuery<ResponseInterface>({
        queryKey: ["isAccountActive"],
        queryFn: () => isAccountAlreadyActive(state?.id),
        refetchOnWindowFocus: "always",
        refetchOnMount: true,
        staleTime: Infinity,
        retry: 1,
    });

    const mutateResendActivationLink = useMutation({
        mutationFn: resendActivationLink,
        onSuccess: (data: UserInfoInterface) => {
            setSecondsLeft(30);
            return data;
        },
        onError: (error: UserInfoInterface) => {
            return error;
        }
    });

    const handleResendEmail = () => {
        const values = { ...state };
        mutateResendActivationLink.mutateAsync(values);
    };

    const percentRemaining = useMemo(() => {
        return (secondsLeft / totalTime) * 100;
    }, [secondsLeft]);

    useEffect(() => {
        if (secondsLeft === 0) setSecondsLeft(0);

        const intervalId = setInterval(() => {
            if (secondsLeft > 0) setSecondsLeft(secondsLeft - 1);
            else return false;
        }, 1000);

        return () => clearInterval(intervalId);
    }, [secondsLeft]);

    useEffect(() => {
        const socketClient = new WebSocket(`${import.meta.env.VITE_WS_BASE_PATH}`);
        socketClient.addEventListener("message", (message: any) => { 
            const messageObject = JSON.parse(message.data);
            if (messageObject?.id === state?.id && messageObject?.isActivated === true) navigateTo("/", { replace: true });
        });

        return () => {
            socketClient.close();
        };
    }, []);
    
    return {
        state,
        secondsLeft,
        handleResendEmail,
        percentRemaining,
        isSendingEmail: mutateResendActivationLink?.isPending,
        isAccountActive: checkisAccountActive?.data?.data?.isActivated,
    };
};