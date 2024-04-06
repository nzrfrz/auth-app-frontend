import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/contextCreate";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Form } from "antd";
import { register } from "../api";
import { ResponseInterface, UserInfoInterface, validateStatus } from "../_helpers";

export type SelectOptionInterface = any;

const userRoleOptions: SelectOptionInterface[] = [
    {
        label: "Admin",
        value: "ADMIN",
        slug: "admin"
    },
    {
        label: "End User",
        value: "ENDUSER",
        slug: "enduser"
    },
];

export const useRegistrationHook = () => {
    const [form] = Form.useForm();
    const navigateTo = useNavigate();
    const { openNotification } = useContext(GlobalContext);

    const filterOption = (input: string, option?: SelectOptionInterface) => option?.slug?.includes(input.toLowerCase()) || option?.value?.includes(input.toLowerCase());

    const queryClient = useQueryClient();
    const mutateRegister = useMutation({
        mutationFn: register,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["isAccountActive"], refetchType: "all" });
            const successReponse = {
                id: data?.data?.id,
                username: data?.data?.username,
                email: data?.data?.email,
            };
            navigateTo("/account-activation-notif", { replace: true, state: {...successReponse} });
        },
        onError: (error: ResponseInterface) => {
            openNotification("error", "login", "Error", `${error?.response?.data?.message}`);
        }
    });

    const handleFormSubmit = async (values: UserInfoInterface) => {
        mutateRegister.mutateAsync(values);
    };

    const formServerValidation = useMemo(() => {
        const usernameErrorResponse = mutateRegister?.error?.response?.data?.data?.username;
        const emailErrorResponse = mutateRegister?.error?.response?.data?.data?.email;
        const usernameValidate: validateStatus = usernameErrorResponse !== undefined ? "error" : undefined;
        const emailValidate: validateStatus = emailErrorResponse !== undefined ? "error" : undefined;

        return {
            usernameValidate,
            emailValidate,
            usernameHelperMessage: usernameErrorResponse,
            emailHelperMessage: emailErrorResponse,
        }
    }, [mutateRegister]);

    return {
        form,
        navigateTo,
        filterOption,
        userRoleOptions,
        handleFormSubmit,
        formServerValidation,
        mutateLoading: mutateRegister.isPending,
    };
};