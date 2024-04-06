import { useContext } from "react";
import { GlobalContext } from "../context/contextCreate";
import { useSearchParamsHook } from "./useSearchParamsHook";

import { deleteUser, getUserPaginated } from "../api";
import { ResponseInterface, UserInfoInterface } from "../_helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = (isModalDeleteOpen: boolean, setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void) => {
    const paginationData = useSearchParamsHook();
    const { openNotification } = useContext(GlobalContext);

    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteUser,
        onSuccess: async (data: ResponseInterface) => {
            // console.log("SUCCESS: ", data);
            await queryClient.fetchQuery({ queryKey: ["userList", paginationData?.limit, paginationData?.page, paginationData?.searchQuery], queryFn: () => getUserPaginated(paginationData?.limit, paginationData?.page, paginationData?.searchQuery) });
            openNotification("success", "delete", "Success", `${data?.message}`);
            if (isModalDeleteOpen === true) setIsModalDeleteOpen(!isModalDeleteOpen);
        },
        onError: async (error: ResponseInterface) => {
            // console.log("ERROR: ", error);
            openNotification("error", "delete", "Error", `${error.response?.data?.message}`);
            if (isModalDeleteOpen === true) setIsModalDeleteOpen(!isModalDeleteOpen);
        }
    });
    // console.log(paginationData);

    const onConfirm = async (data: UserInfoInterface) => {
        mutateDelete.mutateAsync(data?.id);
    };
    // console.log(data);

    return {
        onConfirm
    };
};