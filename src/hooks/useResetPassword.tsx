import { useContext, useMemo } from "react";
import { GlobalContext } from "../context/contextCreate";
import { checkLinkValidity, resetPassword } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ResponseInterface, UserInfoInterface, validateStatus } from "../_helpers";

import { Form } from "antd";

export const useResetPassword = () => {
    const [form] = Form.useForm();
    const navigateTo = useNavigate();
    const params = useParams<{ token: string }>();
    const { isDarkMode } = useContext(GlobalContext);

    const checkLinkValidityResults: ResponseInterface = useQuery({
        queryKey: ["linkValidity"],
        queryFn: () => checkLinkValidity(params?.token),
        staleTime: 7200000,
        retry: false
    });

    const mutateResetPassword = useMutation({
        mutationFn: resetPassword,
        onSuccess: async (data) => {
            setTimeout(() => {
                navigateTo("/", { replace: true });
            }, 1500);
            return data;
        },
        onError: (error: ResponseInterface) => {
            return error;
        }
    });
    // console.log("LINK EXPIRATION: ", checkLinkValidityResults);

    const handleFormSubmit = (values: UserInfoInterface) => {
        const payload = {
            ...values,
            id: checkLinkValidityResults?.data?.data?.id
        }
        mutateResetPassword.mutateAsync(payload);
    };

    const formServerValidation = useMemo(() => {
        // const passwordErrorResponse = mutateResetPassword?.error?.response?.data?.data?.password;
        const passwordErrorResponse = mutateResetPassword?.error?.data?.data?.password;
        const passwordValidate: validateStatus = passwordErrorResponse !== undefined ? "error" : undefined;

        return {
            passwordValidate,
            passwordHelperMessage: passwordErrorResponse,
        }
    }, [mutateResetPassword]);

    return {
        form,
        isDarkMode,
        handleFormSubmit,
        formServerValidation,
        queryLoading: checkLinkValidityResults?.isLoading,
        isLinkExpired: checkLinkValidityResults?.error?.response?.status === 419 ? true : false,
        mutateLoading: mutateResetPassword?.isPending,
        mutateSuccess: mutateResetPassword?.isSuccess,
    }
};