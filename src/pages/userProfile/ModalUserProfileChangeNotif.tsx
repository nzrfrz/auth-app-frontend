import { UserInfoInterface } from "../../_helpers";

import { MyButton } from "../../_components";

import { Modal } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

interface ModalUserProfileChangeNotifInterface {
    actionData?: {
        modalTitle: string,
        modalMessage: string,
        payload: UserInfoInterface,
    };
    mutateLoading?: boolean | undefined
    modalNotifOpen?: boolean;
    toggleModalNotif?: () => void;
    handleConfirmChange?: () => void;
};

export const ModalUserProfileChangeNotif: React.FC<ModalUserProfileChangeNotifInterface> = ({
    actionData,
    mutateLoading,
    modalNotifOpen,
    toggleModalNotif,
    handleConfirmChange
}) => {

    return (
        <Modal
            centered
            maskClosable={!mutateLoading}
            closable={!mutateLoading}
            title={actionData?.modalTitle}
            open={modalNotifOpen} 
            onCancel={() => toggleModalNotif && toggleModalNotif()}
            footer={[
                <MyButton 
                    key="cancel"
                    text="Cancel"
                    colorType="default"
                    loading={mutateLoading}
                    disabled={mutateLoading}
                    onClick={() => toggleModalNotif && toggleModalNotif()}
                />,
                <MyButton 
                    key="save"
                    text="Confirm"
                    colorType="success"
                    loading={mutateLoading}
                    disabled={mutateLoading}
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleConfirmChange && handleConfirmChange()}
                />
            ]}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <span>{actionData?.modalMessage}</span>
                <span style={{ fontSize: 16, fontWeight: 500 }}>Are you sure?</span>
            </div>
        </Modal>
    );
};