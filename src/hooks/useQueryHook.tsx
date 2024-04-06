import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/contextCreate";

import { ResponseInterface } from "../_helpers";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";

export const useQueryHook = (queryKey: any[], fetchFn: Promise<ResponseInterface>, isPlaceholderData: boolean) => {
    const cookie = document.cookie;
    const navigateTo = useNavigate();
    const { openNotification } = useContext(GlobalContext);

    const queryClient = useQueryClient();
    const queryCached = queryClient.getQueryState<ResponseInterface>(queryKey) as ResponseInterface | undefined;
    const queryCachedData = queryCached?.data?.data;
    const errorStatus = queryCached?.error?.response?.status;
    // console.log(queryCached?.error?.response);

    const isObjectEmpty = (objectName: {}) => {
        return (
            objectName &&
            Object.keys(objectName).length === 0 &&
            objectName.constructor === Object
        );
    };

    const query: ResponseInterface = useQuery({
        queryKey,
        queryFn: () => isObjectEmpty(queryCachedData || {}) === true ? fetchFn : null,
        // enabled: isObjectEmpty(queryCachedData || {}) === true ? true : false,
        enabled: isObjectEmpty(queryCachedData || {}) === true && errorStatus !== 403 ? true : false,
        refetchInterval: isObjectEmpty(queryCachedData || {}) === true ? 500 : false,
        placeholderData: isPlaceholderData === true ? keepPreviousData : undefined,
        retry: 1,
    });

    useEffect(() => {
        if (cookie === "" && location.pathname === "/") {
            openNotification("error", "logout", "Expired", "Your session is expired, please login again");
            setTimeout(() => {
                navigateTo("/login", { replace: true });
            }, 500);
        }
    }, [cookie]);

    return query;
};