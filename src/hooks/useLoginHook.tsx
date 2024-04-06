import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GlobalContext } from "../context/contextCreate";

import { Form } from "antd";
import { login } from "../api";
import { ResponseInterface, UserInfoInterface, validateStatus } from "../_helpers";

export const useLoginHook = () => {
    const [form] = Form.useForm();
    const navigateTo = useNavigate();
    const queryClient = useQueryClient();
    const { openNotification } = useContext(GlobalContext);

    const mutateLogin = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            if (data?.data?.isActivated === false) {
                await queryClient.invalidateQueries({ queryKey: ["isAccountActive"], refetchType: "all" });
                const successReponse = {
                    id: data?.data?.id,
                    username: data?.data?.username,
                    email: data?.data?.email,
                };
                navigateTo("/account-activation-notif", { replace: true, state: {...successReponse, locationFrom: location.pathname} });
            }
            else {
                queryClient.clear();
                // await queryClient.fetchQuery({ queryKey: ["userSelfInfo"], queryFn: getUserProfile });
                // await queryClient.fetchQuery({ queryKey: ["userList", 10, 1, ""], queryFn: () => getUserPaginated(10, 1, "") });
                navigateTo("/", { replace: true });
                openNotification("success", "login", "Success", `${data?.message}`);
            }
        },
        onError: (error: ResponseInterface) => {
            openNotification("error", "login", "Error", `${error.response?.data?.message}`);
        }
    });

    const handleFormSubmit = async (values: UserInfoInterface) => {
        mutateLogin.mutateAsync(values);
    };

    const formServerValidation = useMemo(() => {
        const credentialErrorResponse = mutateLogin?.error?.response?.data?.data?.credential;
        const passwordErrorResponse = mutateLogin?.error?.response?.data?.data?.password;
        const credentialValidate: validateStatus = credentialErrorResponse !== undefined ? "error" : undefined;
        const passwordValidate: validateStatus = passwordErrorResponse !== undefined ? "error" : undefined;

        return {
            credentialValidate,
            passwordValidate,
            credentialHelperMessage: credentialErrorResponse,
            passwordHelperMessage: passwordErrorResponse,
        }
    }, [mutateLogin]);

    return {
        form,
        navigateTo,
        handleFormSubmit,
        formServerValidation,
        mutateLoading: mutateLogin.isPending,
    };
};