import React from "react";

import { Popconfirm } from "antd";
import { DeleteOutlined, WarningOutlined } from '@ant-design/icons';

import { MyButton } from "./MyButton";

interface TableButtonDelete {
    rowData?: any,
    onClick?: () => void,
}

export const TableButtonDelete: React.FC<TableButtonDelete> = ({rowData, onClick}) => {
    return (
        <Popconfirm
            placement="topLeft"
            title="Delete data"
            description={`Sure want to delete "${rowData}" data ??`}
            okText="Yes"
            cancelText="No"
            onConfirm={onClick}
            icon={
                <WarningOutlined
                    style={{
                        color: 'red',
                    }}
                />
            }
        >
            <MyButton
                colorType="error" 
                icon={<DeleteOutlined />}
            />
        </Popconfirm>
    );
};