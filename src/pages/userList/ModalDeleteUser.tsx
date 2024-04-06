import { 
    Modal 
} from "antd";
import { useDeleteUser } from "../../hooks";
import { UserInfoInterface } from "../../_helpers";

import { 
    MyButton, 
} from "../../_components";
import { DeleteOutlined } from "@ant-design/icons";

interface ModalEditUserInterface {
    data?: UserInfoInterface;
    isModalDeleteOpen?: boolean | undefined;
    setIsModalDeleteOpen?: (isModalDeleteOpen: boolean) => void | undefined;
};

export const ModalDeleteUser: React.FC<ModalEditUserInterface> = ({
    data,
    isModalDeleteOpen,
    setIsModalDeleteOpen,
}) => {

    const { onConfirm } = useDeleteUser(isModalDeleteOpen as boolean, setIsModalDeleteOpen as () => void);
    
    return (
        <Modal
            centered
            title="Delete user"
            open={isModalDeleteOpen} 
            onCancel={() => setIsModalDeleteOpen && setIsModalDeleteOpen(false)}
            footer={[
                <MyButton 
                    key="cancel"
                    text="Cancel"
                    colorType="default"
                    onClick={() => setIsModalDeleteOpen && setIsModalDeleteOpen(false)}
                />,
                <MyButton 
                    key="delete"
                    text="Confirm"
                    colorType="error"
                    icon={<DeleteOutlined />}
                    onClick={() => onConfirm(data as UserInfoInterface)}
                />
            ]}
        >
            <span>Are you sure you want to delete {data?.username}?</span>
        </Modal>
    );
};