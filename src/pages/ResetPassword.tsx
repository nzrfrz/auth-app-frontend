import { useResetPassword } from "../hooks";

import { Form } from "antd";

import resetPasswordIcon from "../assets/image/icon-reset-password.png";
import styles from "../_styles/ResetPassword.module.css";
import { FullPageNotif, LoadingSandGlass, MyButton, PasswordForm } from "../_components";

export const ResetPassword = () => {
    const {
        form,
        isDarkMode,
        queryLoading,
        isLinkExpired,
        mutateLoading,
        mutateSuccess,
        handleFormSubmit,
        formServerValidation,
    } = useResetPassword();

    if (queryLoading === true && isLinkExpired === false) return ( <LoadingSandGlass loadingText="Checking link..." height={"100vh"}/> );

    if (queryLoading === false && isLinkExpired === true) {
        return (
            <FullPageNotif 
                type="error"
                text={
                    <span style={{ fontSize: 20, textAlign: "center" }}>Your password recovery link has expired</span>
                }
            />
        )
    }

    if (mutateSuccess === true && mutateLoading === false) {
        return (
            <FullPageNotif 
                type="success"
                text={
                    <span style={{ fontSize: 20, textAlign: "center" }}>Your password has been reset <br/><br/> Redirecting to Login</span>
                }
            />
        );
    };

    return (
        <div className={styles.container}>
            <div 
                className={styles.wrapper}
                style={{ 
                    backgroundColor: isDarkMode === true ? 
                    "rgba(255, 255, 255, 0.025)" : 
                    "rgba(255, 255, 255, 0.2)"
                }}
            >
                <div className={styles.imageWrapper}>
                    <img src={resetPasswordIcon} width={200} />
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    wrapperCol={{ span: 24 }}
                    style={{
                        width: "100%"
                    }}
                    disabled={mutateLoading}
                    scrollToFirstError
                    onFinish={handleFormSubmit}
                >
                    <PasswordForm 
                        requiredMark={false}
                        withConfirmPassword={true}
                        help={formServerValidation.passwordHelperMessage}
                        validateStatus={formServerValidation.passwordValidate}
                    />
                    <div className={styles.submitButtonWrapper}>
                        <MyButton 
                            block={true}
                            htmlType="submit"
                            colorType="success"
                            loading={mutateLoading}
                            text={mutateLoading === true ? "Resetting Password..." : "Continue"}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
};