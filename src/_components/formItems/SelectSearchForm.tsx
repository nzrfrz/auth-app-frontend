import { 
    Form,
    Select,
} from 'antd';
import { validateStatus } from "../../_helpers/typeInterface";
import { DefaultOptionType } from 'antd/es/select';
import { FilterFunc } from 'rc-select/lib/Select';

interface SelectSearchForm {
    name?: string, 
    label?: string, 
    placeholder?: string, 
    hasFeedback?: boolean, 
    validateStatus?: validateStatus, 
    help?: string, 
    requiredMark?: boolean, 
    isRulesRequired?: boolean,
    ruleMessage?: string,
    disabled?: boolean,
    selectOptions?: DefaultOptionType[], 
    filterOption?: FilterFunc<DefaultOptionType>,
}

export const SelectSearchForm: React.FC<SelectSearchForm> = ({
    name, 
    label, 
    placeholder, 
    hasFeedback, 
    validateStatus, 
    help, 
    requiredMark, 
    isRulesRequired,
    ruleMessage,
    disabled,
    selectOptions, 
    filterOption, 
}) => {

    return (
        <Form.Item
            hasFeedback={hasFeedback}
            name={name}
            label={label}
            required={requiredMark}
            validateStatus={validateStatus}
            help={help}
            rules={[
                {
                    required: isRulesRequired,
                    message: ruleMessage
                }
            ]}
        >
            <Select
                showSearch
                allowClear
                size="large"
                placeholder={placeholder === undefined ? `Select ${label}` : placeholder}
                optionFilterProp="children"
                style={{
                    // display: "flex",
                    width: "100%",
                }}
                disabled={disabled}
                filterOption={filterOption}
                options={selectOptions}
            />
        </Form.Item>
    );
};