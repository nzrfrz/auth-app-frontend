import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
    ResponseInterface, 
    UserInfoInterface, 
    validateStatus 
} from "../_helpers";
import { sendPasswordReccoveryLink } from "../api";
import { useMutation } from "@tanstack/react-query";
import { GlobalContext } from "../context/contextCreate";

import { Form } from "antd";

export const useForgotPassword = () => {
    const [form] = Form.useForm();
    const navigateTo = useNavigate();
    const { openNotification } = useContext(GlobalContext);

    const mutateSendPasswordRecoveryLink = useMutation({
        mutationFn: sendPasswordReccoveryLink,
        onSuccess: async (data) => {
            form.resetFields();
            openNotification("success", "send email", "Success", `${data?.message}`);
        },
        onError: (error: ResponseInterface) => {
            openNotification("error", "send email", "Error", `${error?.response?.data?.message}`);
        }
    });

    const handleFormSubmit = (values: UserInfoInterface) => {
        mutateSendPasswordRecoveryLink.mutateAsync(values);
    };

    const formServerValidation = useMemo(() => {
        const emailErrorResponse = mutateSendPasswordRecoveryLink?.error?.response?.data?.data?.email;
        const emailValidate: validateStatus = emailErrorResponse !== undefined ? "error" : undefined;

        return {
            emailValidate,
            emailHelperMessage: emailErrorResponse,
        }
    }, [mutateSendPasswordRecoveryLink]);

    return {
        form, 
        navigateTo,
        handleFormSubmit,
        formServerValidation,
        mutateLoading: mutateSendPasswordRecoveryLink.isPending,
    }
};