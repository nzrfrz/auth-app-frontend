import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/contextCreate";
import { ResponseInterface, UserInfoInterface } from "../_helpers";
import { useSearchParamsHook } from "./useSearchParamsHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Form } from "antd";
import { editUser, getUserPaginated } from "../api";

interface EditUserHookInterface {
    data?: UserInfoInterface | undefined;
    isModalEditOpen?: boolean | undefined;
    setIsModalEditOpen?: (isModalEditOpen: boolean) => void | undefined;
};

export const useEditUser = ({data, isModalEditOpen, setIsModalEditOpen}: EditUserHookInterface) => {
    const [form] = Form.useForm();
    const paginationData = useSearchParamsHook();
    const { openNotification } = useContext(GlobalContext); 

    const queryClient = useQueryClient();
    const mutateEdit = useMutation({
        mutationFn: editUser,
        onSuccess: async (data: ResponseInterface) => {
            await queryClient.fetchQuery({ queryKey: ["userList", paginationData?.limit, paginationData?.page, paginationData?.searchQuery], queryFn: () => getUserPaginated(paginationData?.limit, paginationData?.page, paginationData?.searchQuery) });
            openNotification("success", "editUser", "Success", `${data?.message}`);
            if (isModalEditOpen === true) setIsModalEditOpen && setIsModalEditOpen(!isModalEditOpen);
        },
        onError: async (error: ResponseInterface) => {
            openNotification("error", "editUser", "Error", `${error.response?.data?.message}`);
            if (isModalEditOpen === true) setIsModalEditOpen && setIsModalEditOpen(!isModalEditOpen);
        }
    });

    const onFinishForm = () => {
        form.validateFields()
            .then(async (values) => {
                if (data?.username !== values.username || data?.email !== values.email) {
                    const payload = {
                        ...values,
                        userID: data?.id
                    };
                    mutateEdit.mutateAsync(payload);
                }
                else {
                    openNotification("info", "editUser", "Info", "No change has been made");
                    if (isModalEditOpen === true) setIsModalEditOpen && setIsModalEditOpen(!isModalEditOpen);
                }
            })
            .catch(() => {
                // console.log('Validate Failed:', info);
                return false;
            });
    };

    useEffect(() => {
        if (data !== undefined) {
            form.setFieldsValue({
                username: data?.username,
                email: data?.email
            });
        }
    }, [data]);

    return {
        form,
        onFinishForm,
        mutateLoading: mutateEdit?.isPending,
    };
};