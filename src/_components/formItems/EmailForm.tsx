import { 
    Form,
    Input,
} from 'antd';
import { validateStatus } from '../../_helpers/typeInterface';

interface EmailFormInterface {
    name?: string; 
    label?: string; 
    disabled?: boolean | undefined;
    requiredMark?: boolean;
    validateStatus?: validateStatus;
    help?: string;
};

export const EmailForm: React.FC<EmailFormInterface> = ({name, label, disabled = undefined, requiredMark = true, validateStatus, help}) => {
    
    return (
        <Form.Item
            name={name}
            label={label}
            required={requiredMark}
            validateStatus={validateStatus}
            help={help}
            rules={[
                {
                    type: 'email',
                    message: 'Not a valid email address!',
                },
                {
                    required: true,
                    message: 'Email cannot be empty!',
                },
            ]}
        >
            <Input 
                size="large"
                disabled={disabled}
                placeholder="Input Email"
            />
        </Form.Item>
    );
};