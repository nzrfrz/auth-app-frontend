import dayjs from "dayjs";
import { UserInfoInterface } from "../../_helpers";

import { AvatarImage, LoadingSandGlass } from "../../_components";

import { Button, Card, Dropdown, MenuProps, Pagination, Tag } from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";

import styles from "../../_styles/UserList.module.css";

interface UserListCardGridInterface {
    cardGridPaginationRef?: (node: HTMLDivElement) => void;
    cardContentHeight?: number;
    cardData?: UserInfoInterface[],
    page?: number;
    setPage?: (page: number) => void;
    totalData?: number;
    isLoading?: boolean;
    onClickMenu?: (key: string, data: UserInfoInterface) => void;
};

const items: MenuProps['items'] = [
    {
        label: 'Edit',
        key: 'edit',
        icon: <EditOutlined />,
    },
    {
        label: 'Delete',
        key: 'delete',
        icon: <DeleteOutlined />,
    }
];

export const UserListCardGrid: React.FC<UserListCardGridInterface> = ({
    cardGridPaginationRef,
    cardContentHeight,
    cardData,
    page,
    setPage,
    totalData,
    isLoading,
    onClickMenu
}) => {

    const UserRoleTag = ({userRole}: {userRole: string | undefined}) => {
        if (userRole === "ADMIN") return (
            <Tag color="orange">{userRole}</Tag>
        )
        else if (userRole === "ENDUSER") return (
            <Tag color="lime">{userRole}</Tag>
        )
    };
    
    return (
        <div className={styles.cardGridContainer}>
            {
                isLoading === true ? 
                <LoadingSandGlass loadingText="Data Loading..." height={cardContentHeight} />
                :
                null
            }
            <div className={styles.cardGridWrapper} style={{ height: cardContentHeight }}>
                {
                    cardData?.map((data, index) => 
                        <Card 
                            key={index}
                            bordered={false}
                            style={{ 
                                visibility: data?.empty === true ? "hidden" : "visible",
                                flex: "1 1 calc(33.33% - 20px)",
                                width: "100%",
                                height: 172,
                            }}
                            title={
                                <div className={styles.cardTitleWrapper}>
                                    <AvatarImage 
                                        userInfo={data}
                                    />
                                    <div>
                                        <span>{data?.username}</span>
                                    </div>
                                </div>
                            }
                            extra={
                                <Dropdown 
                                    menu={{ items, onClick: ({key}) => onClickMenu && onClickMenu(key, data) }}
                                >
                                    <Button shape="circle" icon={<MoreOutlined />} />
                                </Dropdown>
                            } 
                        >
                            <div className={styles.cardContentWrapper}>
                                <div style={{ width: 180 }}>
                                    <span>{data?.email}</span>
                                </div>
                                <div className={styles.cardFooterWrapper}>
                                    <UserRoleTag userRole={data?.userRole} />
                                    <span style={{ fontSize: 10 }}>{dayjs(data?.createdAt).format("YYYY, DD MMMM ")}</span>
                                </div>
                            </div>
                        </Card>
                    )
                }
            </div>
            <div ref={cardGridPaginationRef} className={styles.cardPaginationContainer}>
                <Pagination 
                    simple 
                    total={totalData} 
                    disabled={isLoading}
                    defaultCurrent={page} 
                    showSizeChanger={false} 
                    onChange={(currentPage) => setPage && setPage(currentPage)}
                />
            </div>
        </div>
    );
};