import { useContext } from "react";
import { useForgotPassword } from "../hooks";
import { GlobalContext } from "../context/contextCreate";

import { Divider, Form } from "antd";
import { EmailForm, MyButton } from "../_components";

import forgotPasswordIcon from "../assets/image/icon-forgot-password.png";
import styles from "../_styles/ForgotPassword.module.css";

export const ForgotPassword = () => {
    const { isDarkMode } = useContext(GlobalContext);

    const {
        form,
        navigateTo,
        mutateLoading,
        handleFormSubmit,
        formServerValidation,
    } = useForgotPassword();

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
                    <img src={forgotPasswordIcon} width={200} />
                </div>

                <div style={{ marginTop: 20, marginBottom: 20 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 200 }}>
                        Enter the email address associated with your account and we'll send a link to reset your password.
                    </span>
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    wrapperCol={{ span: 24 }}
                    style={{
                        width: "100%"
                    }}
                    scrollToFirstError
                    disabled={mutateLoading}
                    onFinish={handleFormSubmit}
                >
                    <EmailForm 
                        name="email"
                        label="Email"
                        requiredMark={false}
                        validateStatus={formServerValidation.emailValidate}
                        help={formServerValidation.emailHelperMessage}
                    />
                    <div className={styles.submitButtonWrapper}>
                        <MyButton 
                            block={true}
                            htmlType="submit"
                            colorType="success"
                            loading={mutateLoading}
                            text={mutateLoading === true ? "Sending email" : "Continue"}
                        />
                    </div>
                </Form>
                <Divider style={{ marginTop: 20, marginBottom: 10 }}>Don't have an account?</Divider>
                <div className={styles.footerContainer}>
                    <MyButton 
                        block={true}
                        text="Register"
                        colorType="default"
                        disabled={mutateLoading}
                        onClick={() => navigateTo("/register")}
                    />
                </div>
            </div>
        </div>
    );
};