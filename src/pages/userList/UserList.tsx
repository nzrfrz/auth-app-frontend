import { useUserList } from "../../hooks";

import { ModalEditUser } from "./ModalEditUser";
import { ModalDeleteUser } from "./ModalDeleteUser";
import { UserListDataGrid } from "./UserListDataGrid";
import { UserListCardGrid } from "./UserListCardGrid";
import { PaginationButton, SearchInput } from "../../_components";

import { Pagination } from "antd";

import styles from "../../_styles/UserList.module.css";

export const UserList = () => {
    const {
        page,
        setPage,
        setLimitPerPage,
        debounceSave,
        setSearchValue,
        userListResponse,
        cardData,
        contentHeaderRef,
        tablePaginationRef,
        cardPaginationRef,
        tableHeight,
        cardContentHeight,
        onClickCardMenu,
        onClickTableEdit,
        selectedUserData,
        isModalEditOpen, 
        setIsModalEditOpen,
        isModalDeleteOpen, 
        setIsModalDeleteOpen,
    } = useUserList();

    const { data, isLoading } = userListResponse;
    // console.log(selectedUserData);

    return (
        <>
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <div ref={contentHeaderRef} style={{ flexGrow: 1 }}>
                    <SearchInput 
                        placeHolder="Search Something?"
                        onSearch={(value) => setSearchValue(value)}
                        onChange={(e) => debounceSave(e.target.value)}
                    />
                </div>
                <div className={styles.tableWrapper}>
                    <UserListDataGrid 
                        isLoading={isLoading}
                        tableHeight={tableHeight}
                        tableData={data?.data?.userList}
                        isModalDeleteOpen={isModalDeleteOpen}
                        setIsModalDeleteOpen={setIsModalDeleteOpen}
                        onClickEdit={onClickTableEdit}
                    />
                    <div ref={tablePaginationRef}>
                        <Pagination
                            showQuickJumper
                            showSizeChanger
                            current={page}
                            disabled={userListResponse?.data?.data?.userList === undefined}
                            total={userListResponse?.data?.data?.meta?.totalPage}
                            itemRender={PaginationButton}
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                            style={{
                                display: "flex",
                                justifyContent: "flex-end"
                            }}
                            onShowSizeChange={(_currentPage, pageSize) => {
                                setLimitPerPage(pageSize);
                            }}
                            onChange={async (currentPage) => {
                                setPage(currentPage);
                            }}
                        />
                    </div>
                </div>
                <UserListCardGrid 
                    cardGridPaginationRef={cardPaginationRef}
                    cardContentHeight={cardContentHeight}
                    cardData={cardData}
                    page={page}
                    setPage={setPage}
                    totalData={data?.data?.meta?.totalPage}
                    isLoading={isLoading}
                    onClickMenu={onClickCardMenu}
                />
            </div>
        </div>

        <ModalEditUser 
            data={selectedUserData}
            isModalEditOpen={isModalEditOpen}
            setIsModalEditOpen={setIsModalEditOpen}
        />

        <ModalDeleteUser 
            data={selectedUserData}
            isModalDeleteOpen={isModalDeleteOpen}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
        />
        </>
    );
};