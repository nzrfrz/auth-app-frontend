import { useRegistrationHook } from "../hooks";

import { 
    Form ,
    Divider, 
} from "antd";
import { 
    EmailForm, 
    MyButton, 
    PasswordForm, 
    SelectSearchForm, 
    SimpleInputForm 
} from "../_components";

import registerIcon from "../assets/image/icon-register.png";
import styles from "../_styles/Register.module.css";

export const Register = () => {
    const {
        form,
        navigateTo,
        filterOption,
        mutateLoading,
        userRoleOptions,
        handleFormSubmit,
        formServerValidation,
    } = useRegistrationHook();

    return (
        <div className={styles.container} style={{  }}>
            <div className={styles.wrapper}>
                <div className={styles.imageWrapper}>
                    <img src={registerIcon} width={200} />
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    scrollToFirstError
                    disabled={mutateLoading}
                    wrapperCol={{ span: 24 }}
                    style={{
                        width: "100%",
                    }}
                    onFinish={handleFormSubmit}
                >
                    <div className={styles.formContainer}>
                        <div style={{
                            width: "100%"
                        }}>
                            <SimpleInputForm 
                                name="username"
                                label="Username"
                                requiredMark={false}
                                isRulesRequired={true}
                                validateStatus={formServerValidation.usernameValidate}
                                help={formServerValidation.usernameHelperMessage}
                            />
                            <EmailForm 
                                name="email"
                                label="Email"
                                requiredMark={false}
                                validateStatus={formServerValidation.emailValidate}
                                help={formServerValidation.emailHelperMessage}
                            />
                            <SelectSearchForm 
                                name="userRole"
                                label="User Role"
                                requiredMark={false}
                                isRulesRequired={true}
                                ruleMessage="Please select User role"
                                selectOptions={userRoleOptions}
                                filterOption={filterOption}
                            />
                        </div>
                        <div style={{
                            width: "100%"
                        }}>
                            <PasswordForm 
                                requiredMark={false}
                                withConfirmPassword={true}
                            />
                            <div className={styles.submitButtonWrapper}>
                                <MyButton 
                                    block={true}
                                    text="Register"
                                    htmlType="submit"
                                    colorType="success"
                                    loading={mutateLoading}
                                />
                            </div>
                        </div>
                    </div>
                </Form>
                <Divider style={{ marginTop: 20, marginBottom: 10 }}>Have an account?</Divider>
                <div className={styles.footerContainer}>
                    <MyButton 
                        block={true}
                        text="Sign In"
                        colorType="default"
                        disabled={mutateLoading}
                        onClick={() => navigateTo("/login")}
                    />
                </div>
            </div>
        </div>
    );
}