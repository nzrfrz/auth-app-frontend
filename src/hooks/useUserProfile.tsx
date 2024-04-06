import { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/contextCreate";

import { Form } from "antd";
import { UserInfoInterface } from "../_helpers";

export const useUserProfile = () => {
    const [form] = Form.useForm();
    const { userInfo, openNotification } = useContext(GlobalContext);

    const [isChangeProfile, setIsChangeProfile] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [modalNotifOpen, setModalNotifOpen] = useState(false);
    const [actionData, setActionData] = useState({
        modalTitle: "",
        modalMessage: "",
        payload: {},
    });

    const handleClickChangeProfile = useCallback(() => {
        setIsChangeProfile(!isChangeProfile);
        setActionData({
            modalTitle: "",
            modalMessage: "",
            payload: {},
        });
        form.setFieldsValue({
            username: userInfo?.username,
            email: userInfo?.email
        });
        if (isChangePassword === true) setIsChangePassword(false);
    }, [userInfo, isChangeProfile, isChangePassword]);

    const handleClickChangePassword = useCallback(() => {
        setIsChangePassword(!isChangePassword);
        setActionData({
            modalTitle: "",
            modalMessage: "",
            payload: {},
        });
        form.setFieldsValue({
            username: userInfo?.username,
            email: userInfo?.email
        });
        form.resetFields(["password", "confirmPassword"]);
        if (isChangeProfile === true) setIsChangeProfile(false);
    }, [isChangePassword, isChangeProfile]);

    const handleFormSubmit = async (values: UserInfoInterface) => {
        if (values.username === userInfo?.username && values.email === userInfo?.email && values?.password === undefined) {
            setIsChangeProfile(false);
            setIsChangePassword(false);
            setActionData({
                modalTitle: "",
                modalMessage: "",
                payload: {},
            });
            openNotification("info", "editProfile", "Info", `No changed has been made`);
        }
        else {
            setModalNotifOpen(true);
            switch (true) {
                case values.username !== userInfo?.username && values.email !== userInfo?.email && values?.password === undefined:
                    setActionData({
                        modalTitle: "Change Username and Email",
                        modalMessage: "You are about to change your Username and Email, you need to activate your email and re-login after successfully change.",
                        payload: {
                            username: values.username,
                            email: values.email
                        }
                    });
                    break;
                case values.username === userInfo?.username && values.email === userInfo?.email && values?.password !== undefined:
                    setActionData({
                        modalTitle: "Change Password",
                        modalMessage: "You are about to change your Password, you need to re-login after successfully change in order to take effect.",
                        payload: {
                            password: values.password
                        }
                    });
                    break;
                case values.username !== userInfo?.username && values.email === userInfo?.email && values?.password === undefined:
                    setActionData({
                        modalTitle: "Change Username",
                        modalMessage: "You are about to change your Username, you need to re-login after successfully change in order to take effect.",
                        payload: {
                            username: values.username
                        }
                    });
                    break;
                case values.username === userInfo?.username && values.email !== userInfo?.email && values?.password === undefined:
                    setActionData({
                        modalTitle: "Change Email",
                        modalMessage: "You are about to change your Email, you need to activate your email and re-login after successfully change.",
                        payload: {
                            email: values.email
                        }
                    });
                    break;
                default:
                    break;
            }
        }
    };

    const toggleModalNotif = useCallback(() => {
        setIsChangeProfile(false);
        setIsChangePassword(false);
        setActionData({
            modalTitle: "",
            modalMessage: "",
            payload: {},
        });
        form.setFieldsValue({
            username: userInfo?.username,
            email: userInfo?.email
        });
        form.resetFields(["password", "confirmPassword"]);
        setModalNotifOpen(!modalNotifOpen);
    }, [modalNotifOpen]);

    useEffect(() => {
        form.setFieldsValue({
            username: userInfo?.username,
            email: userInfo?.email
        });
    }, [userInfo]);

    return {
        form,
        userInfo,
        actionData,
        modalNotifOpen, 
        isChangeProfile, 
        isChangePassword, 
        handleClickChangeProfile,
        handleClickChangePassword,
        handleFormSubmit,
        toggleModalNotif,
    }
};