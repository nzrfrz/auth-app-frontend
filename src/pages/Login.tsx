import { useContext } from "react";
import { GlobalContext } from "../context/contextCreate";

import { Button, Divider, Form } from "antd";
import { 
    MyButton, 
    PasswordForm, 
    SimpleInputForm,
} from "../_components";

import loginIcon from "../assets/image/icon-login.png";
import styles from "../_styles/Login.module.css";
import { useLoginHook } from "../hooks";

export const Login = () => {
    const { isDarkMode, windowDimension } = useContext(GlobalContext);

    const {
        form,
        navigateTo,
        handleFormSubmit,
        formServerValidation,
        mutateLoading,
    } = useLoginHook();

    return (
        <div className={styles.container} style={{ height: windowDimension.height }}>
            <div
                className={styles.wrapper}
                style={{ 
                    backgroundColor: isDarkMode === true ? 
                    "rgba(255, 255, 255, 0.025)" : 
                    "rgba(255, 255, 255, 0.1)"
                }}
            >
                <div className={styles.imageWrapper}>
                    <img src={loginIcon} width={200} />
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
                    <SimpleInputForm 
                        name="credential"
                        label="Username or Email"
                        requiredMark={false}
                        isRulesRequired={true}
                        validateStatus={formServerValidation.credentialValidate}
                        help={formServerValidation.credentialHelperMessage}
                    />
                    <PasswordForm 
                        requiredMark={false}
                        withConfirmPassword={false}
                        validateStatus={formServerValidation.passwordValidate}
                        help={formServerValidation.passwordHelperMessage}
                    />
                    <div className={styles.submitButtonWrapper}>
                        <MyButton 
                            block={true}
                            text="Sign In"
                            htmlType="submit"
                            colorType="success"
                            loading={mutateLoading}
                        />
                        <div className={styles.forgotPassWrapper}>
                            <Button 
                                type="link"
                                style={{ padding: 0 }}
                                disabled={mutateLoading}
                                onClick={() => navigateTo("/forgot-password")}
                            >
                                Forgot Password ?
                            </Button>
                        </div>
                    </div>
                </Form>
                <Divider style={{ marginTop: 0, marginBottom: 10 }}>Don't have an account?</Divider>
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