import React from "react";
import { 
    Form,
    Input,
} from 'antd';
import { validateStatus } from "../../_helpers/typeInterface";

interface PasswordForm {
    required?: boolean | undefined,
    withConfirmPassword?: boolean, 
    requiredMark?: boolean, 
    validateStatus?: validateStatus, 
    help?: string, 
    ruleMessage?: string
};

export const PasswordForm: React.FC<PasswordForm> = ({required = true, withConfirmPassword, requiredMark = true, validateStatus, help, ruleMessage}) => {
    
    return (
        <>
        <Form.Item
            name="password"
            label="Password"
            hasFeedback
            validateStatus={validateStatus}
            help={help}
            required={requiredMark}
            rules={[
                {
                    required: required,
                    message: ruleMessage,
                },
            ]}
        >
            <Input.Password 
                size="large"
                placeholder="Input Password"
            />
        </Form.Item>
        
        {
            withConfirmPassword === false ?
            null
            :
            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                required={requiredMark}
                hasFeedback
                rules={[
                    {
                        required: required,
                        message: 'Password confirmation still empty!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Not same Password!'));
                        },
                    }),
                ]}
            >
                <Input.Password 
                    size="large"
                    placeholder="Retype Password"
                />
          </Form.Item>
        }
        </>
    );
};