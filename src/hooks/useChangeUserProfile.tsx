import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/contextCreate";
import { useMutation } from "@tanstack/react-query";
import { changeProfilePassword, changeProfileUsernameAndEmail } from "../api";
import { ResponseInterface, UserInfoInterface } from "../_helpers";

interface ChangeUserProfileInterface {
    actionData?: {
        modalTitle: string,
        modalMessage: string,
        payload: UserInfoInterface
    };
    toggleModalNotif?: () => void | undefined;
};

export const useChangeUserProfile = ({ actionData, toggleModalNotif }: ChangeUserProfileInterface) => {
    const navigateTo = useNavigate();
    const { openNotification } = useContext(GlobalContext);

    const mutationFN = actionData?.payload.password !== undefined ? changeProfilePassword : changeProfileUsernameAndEmail;
    
    const mutateChangeUsernameOrEmail = useMutation({
        mutationFn: mutationFN,
        onSuccess: async (data: ResponseInterface) => {
            // console.log("SUCCESS MUTATE: ", data);
            toggleModalNotif && toggleModalNotif();
            openNotification("success", "editUser", "Success", `${data?.message}`);
            navigateTo("/login", { replace: true });
        },
        onError: async (error: ResponseInterface) => {
            console.log("ERROR MUTATE: ", error);
            if (error?.response?.status === 403) {
                navigateTo("/login");
                openNotification("error", "editUser", "Expired", "Your session is expired, please login again");
            }
            else {
                openNotification("error", "editUser", "Error", `${error.response?.data?.message}`);
                toggleModalNotif && toggleModalNotif();
            }
        },
    });    

    const handleConfirmChange = async () => {
        mutateChangeUsernameOrEmail.mutateAsync(actionData?.payload);
    };

    return {
        handleConfirmChange,
        mutateLoading: mutateChangeUsernameOrEmail?.isPending,
    }
};