import { useChangeUserProfile, useUserProfile } from "../../hooks";

import { 
    Card, 
    Form, 
    Divider, 
} from "antd";
import {
    SaveOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons';
import { ModalUserProfileChangeNotif } from "./ModalUserProfileChangeNotif";
import { EmailForm, MyButton, PasswordForm, SimpleInputForm } from "../../_components";

import defaultProfilePic from "../../assets/image/default-profile-pic.png";
import styles from "../../_styles/UserProfile.module.css";

export const UserProfile = () => {
    const {
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
    } = useUserProfile();    
    
    const {
        handleConfirmChange,
        mutateLoading
    } = useChangeUserProfile({actionData, toggleModalNotif});

    return (
        <>
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span className={styles.headerTitle}>My Profile</span>
                <div className={styles.contentWrapper}>

                    <div className={styles.avatarWrapper}>
                        <Card style={{ width: "100%" }}>
                            <div className={styles.cardContentWrapper}>
                                <img src={defaultProfilePic} width={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                <MyButton 
                                    block={true}
                                    text="Select Photo"
                                    colorType="info"
                                />
                                <span>
                                Coming Soon
                                </span>
                            </div>
                        </Card>
                    </div>

                    <div className={styles.formWrapper}>
                        <Form
                            form={form}
                            layout="vertical"
                            scrollToFirstError
                            wrapperCol={{ span: 24 }}
                            style={{
                                width: "100%",
                            }}
                            onFinish={handleFormSubmit}
                        >
                            <SimpleInputForm 
                                name="username"
                                label="Username"
                                requiredMark={false}
                                isRulesRequired={true}
                                disabled={!isChangeProfile}
                            />
                            <EmailForm 
                                name="email"
                                label="Email"
                                requiredMark={false}
                                disabled={!isChangeProfile}
                            />
                            <div style={{ display: isChangePassword === true ? "block" : "none" }}>
                                <Divider style={{ marginTop: 20, marginBottom: 10 }}>Change Password</Divider>
                                <PasswordForm 
                                    required={false}
                                    requiredMark={false}
                                    withConfirmPassword={true}
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 20 }}>
                                <MyButton 
                                    text="Change Profile"
                                    colorType={isChangeProfile === true ? "info" : "default"}
                                    icon={isChangeProfile === true ? <ArrowLeftOutlined /> : null}
                                    disabled={userInfo?.userRole === "ROOT" ? true : false}
                                    onClick={() => handleClickChangeProfile()}
                                />
                                <MyButton 
                                    text="Change Password"
                                    colorType={isChangePassword === true ? "info" : "default"}
                                    icon={isChangePassword === true ? <ArrowLeftOutlined /> : null}
                                    onClick={() => handleClickChangePassword()}
                                />
                                <MyButton 
                                    text="Save Changes"
                                    colorType="success"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    style={{ display: isChangePassword === true || isChangeProfile === true ? "block" : "none" }}
                                />
                            </div>
                        </Form>
                    </div>

                </div>
                <div style={{ padding: 5 }}/>
            </div>
        </div>

        <ModalUserProfileChangeNotif 
            actionData={actionData}
            mutateLoading={mutateLoading}
            modalNotifOpen={modalNotifOpen}
            toggleModalNotif={toggleModalNotif}
            handleConfirmChange={handleConfirmChange}
        />
        </>
    )
}