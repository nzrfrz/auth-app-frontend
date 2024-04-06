import dayjs from "dayjs";

import { Table, TableProps, Tag } from "antd";
import { MyButton, TableButtonDelete } from "../../_components";
import { EditOutlined } from "@ant-design/icons";

import { UserInfoInterface } from "../../_helpers";
import { useDeleteUser } from "../../hooks";

interface UserListDataGridInterface {
    tableData?: UserInfoInterface[];
    tableHeight?: number;
    isLoading?: boolean;
    isModalDeleteOpen?: boolean;
    setIsModalDeleteOpen?: (isModalDeleteOpen: boolean) => void;
    onClickEdit?: (record: UserInfoInterface) => void | undefined;
};

export const UserListDataGrid: React.FC<UserListDataGridInterface> = ({ 
    tableData, 
    tableHeight, 
    isLoading,
    isModalDeleteOpen,
    setIsModalDeleteOpen,
    onClickEdit
}) => {

    const { onConfirm } = useDeleteUser(isModalDeleteOpen as boolean, setIsModalDeleteOpen as () => void);

    const columns: TableProps<UserInfoInterface>['columns'] = [
        {
            title: 'No',
            width: 25,
            fixed: "left",
            render: (_: UserInfoInterface, __: UserInfoInterface, index: number) => (
                <span>{index + 1}</span>
            )
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            width: 100,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 150,
        },
        {
            title: 'Member Since',
            key: 'createdAt',
            width: 70,
            render: (_: UserInfoInterface, record: UserInfoInterface) => (
                <span>{dayjs(record?.createdAt).format("YYYY, DD MMMM ")}</span>
            )
        },
        {
            title: 'User Role',
            key: 'userRole',
            fixed: 'right',
            width: 40,
            render: (_: UserInfoInterface, record: UserInfoInterface) => {
                if (record?.userRole === "ADMIN") return (
                    <Tag color="orange">{record?.userRole}</Tag>
                )
                else if (record?.userRole === "ENDUSER") return (
                    <Tag color="lime">{record?.userRole}</Tag>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 50,
            render: (_: UserInfoInterface, record: UserInfoInterface) => (
                <div 
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 12
                    }}
                >
                    <MyButton 
                        colorType="warning"
                        icon={<EditOutlined />}
                        // onClick={() => setIsModalEditOpen && setIsModalEditOpen(!isModalEditOpen)}
                        onClick={() => onClickEdit && onClickEdit(record)}
                    />
                    <TableButtonDelete 
                        rowData={record?.username}
                        onClick={() => onConfirm(record)}
                    />
                </div>
            )
        },
    ];

    return (
        <Table 
            rowKey={(record: UserInfoInterface) => record.id ? record.id : ''} 
            columns={columns} 
            dataSource={tableData}
            scroll={{ x: 1200, y: tableHeight }}
            pagination={false}
            loading={isLoading}
        />
    );
};