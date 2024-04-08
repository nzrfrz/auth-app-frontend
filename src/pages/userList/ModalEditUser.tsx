import { 
    Form,
    Modal 
} from "antd";
import { useEditUser } from "../../hooks";
import { UserInfoInterface } from "../../_helpers";

import { 
    EmailForm, 
    MyButton, 
    SimpleInputForm 
} from "../../_components";
import { SaveOutlined } from "@ant-design/icons";

interface ModalEditUserInterface {
    data?: UserInfoInterface;
    isModalEditOpen?: boolean;
    setIsModalEditOpen?: (isModalEditOpen: boolean) => void | undefined;
};

export const ModalEditUser: React.FC<ModalEditUserInterface> = ({
    data,
    isModalEditOpen,
    setIsModalEditOpen,
}) => {

    const {
        form,
        onFinishForm,
        mutateLoading,
    } = useEditUser({data, isModalEditOpen, setIsModalEditOpen});
    
    return (
        <Modal
            centered
            title="Edit user"
            open={isModalEditOpen} 
            closable={!mutateLoading}
            maskClosable={!mutateLoading}
            onCancel={() => setIsModalEditOpen && setIsModalEditOpen(false)}
            footer={[
                <MyButton 
                    key="cancel"
                    text="Cancel"
                    colorType="default"
                    loading={mutateLoading}
                    disabled={mutateLoading}
                    onClick={() => setIsModalEditOpen && setIsModalEditOpen(false)}
                />,
                <MyButton 
                    key="save"
                    text={mutateLoading === true ? "Saving data..." : "Save"}
                    colorType="success"
                    icon={<SaveOutlined />}
                    loading={mutateLoading}
                    disabled={mutateLoading}
                    onClick={() => onFinishForm()}
                />
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                name="editUserInfo"
                scrollToFirstError
                disabled={mutateLoading}
                wrapperCol={{ span: 24 }}
            >
                <SimpleInputForm 
                    name="username"
                    label="Username"
                    requiredMark={false}
                    isRulesRequired={true}
                />
                <EmailForm 
                    name="email"
                    label="Email"
                    requiredMark={false}
                />
            </Form>
        </Modal>
    );
};