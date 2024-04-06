import dayjs from "dayjs";
import { useUserInfo } from "../../hooks";

import { Avatar, Divider, Drawer, Tag } from "antd";

import {
    UserOutlined,
    SettingOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { MyButton, ThemeToggler } from "..";
import { LogoutButton } from "../LogoutButton";
import { NavbarMenuBurger } from "../NavbarMenuBurger";
import styles from "../../_styles/MobileDrawer.module.css";

const drawerContents = [
    {
        label: 'Profile',
        key: 'profile',
        leftIcon: <UserOutlined />,
        rightIcon: "",
        routePath: "/user-profile",
    },
    {
        label: 'Setting',
        key: 'setting',
        leftIcon: <SettingOutlined />,
        rightIcon: "",
        routePath: "/setting",
    }
];

export const MobileDrawer = () => {
    const { 
        userInfo,
        navigateTo,
        tagColor,
        handleLogout,
        showDrawer, 
        setShowDrawer,
        handleClickMenuDD,
    } = useUserInfo();

    return (
        <div className={styles.container}>
            <NavbarMenuBurger
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
            />
            <Drawer
                width={250}
                closable={false}
                open={showDrawer}
                placement="right"
                title={
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        backgroundColor: "#334155",
                        padding: "2px 10px",
                    }}>
                        <NavbarMenuBurger
                            showDrawer={showDrawer}
                            setShowDrawer={setShowDrawer}
                        />
                        <ThemeToggler />
                        <MyButton 
                            colorType="default"
                            shape="circle"
                            icon={ <HomeOutlined /> }
                            onClick={() => navigateTo("/")}
                        />
                    </div>
                }
                getContainer={false}
                onClose={() => setShowDrawer(false)}
            >
                <div className={styles.drawerContentWrapper}>
                    <div className={styles.userProfileWrapper}>
                        <Avatar 
                            size="large"
                            src="" 
                            style={{ backgroundColor: '#1677ff' }}
                        >
                            {userInfo?.username?.slice(0, 3)}
                        </Avatar>
                        <div className={styles.profileDisplayWrapper}>
                            <div>
                                <span>{userInfo?.username}</span>
                            </div>
                            <div>
                                <Tag color={tagColor}>{userInfo?.userRole}</Tag>
                                <span>
                                    {dayjs(userInfo?.createdAt).format("YYYY, DD MMMM ")}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Divider style={{ padding: 0, margin: 0 }} />
                    {
                        drawerContents?.map((data) => (
                            <div key={data?.key} className={styles.drawerMenuWrapper} onClick={() => handleClickMenuDD(data.routePath)}>
                                <div >
                                    {data?.leftIcon}
                                    <span>{data?.label}</span>
                                </div>
                            </div>
                        ))
                    }
                    <Divider style={{ padding: 0, margin: 0 }} />
                    <LogoutButton 
                        onClick={handleLogout}
                    />
                </div>
            </Drawer>
        </div>
    );
};