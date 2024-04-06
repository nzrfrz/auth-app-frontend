import dayjs from "dayjs";
import { useUserInfo } from "../../hooks";

import { Avatar, Divider, Dropdown, Spin, Tag, theme } from "antd";
import { MyButton } from "../MyButton";

import {
    UserOutlined,
    SettingOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { LogoutButton } from "../LogoutButton";
import { ThemeToggler } from "../ThemeToggler";
import { MobileDrawer } from "./MobileDrawer";
import styles from "../../_styles/NavbarMenu.module.css";

const { useToken } = theme;

const ddContents = [
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

export const NavbarMenu = () => {
    const { token } = useToken();

    const { 
        openDD, 
        userInfo,
        setOpenDD,
        navigateTo,
        tagColor,
        handleLogout,
        handleClickMenuDD
    } = useUserInfo();
    // console.log("NAVBAR MENU: ", userInfo);
  
    const contentStyle: React.CSSProperties = {
        background: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadow,
    };
    
    return (
        <>
        <MobileDrawer />
        <div className={styles.container}>
            {
                userInfo === undefined ? 
                <Spin size="default" />
                :
                <>
                <ThemeToggler />
                <MyButton 
                    colorType="default"
                    shape="circle"
                    icon={ <HomeOutlined /> }
                    onClick={() => navigateTo("/")}
                />
                <Dropdown
                    menu={{}}
                    open={openDD}
                    trigger={['click']}
                    onOpenChange={(flag) => setOpenDD(flag)}
                    dropdownRender={() => (
                        <div className={styles.ddContentContainer} style={contentStyle}>
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
                            <Divider style={{ margin: 5 }} />
                            {
                                ddContents?.map((data) => (
                                    <div key={data?.key} className={styles.ddMenuWrapper} onClick={() => handleClickMenuDD(data.routePath)}>
                                        <div >
                                            {data?.leftIcon}
                                            <span>{data?.label}</span>
                                        </div>
                                    </div>
                                ))
                            }
                            <Divider style={{ margin: 5 }} />
                            <LogoutButton 
                                onClick={handleLogout}
                            />
                        </div>
                    )}
                >
                    <MyButton 
                        colorType="default"
                        shape="circle"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        icon={
                            <Avatar 
                                size="default" 
                                src="" 
                                style={{ backgroundColor: userInfo?.avatarColor }}
                            >
                                {userInfo?.username?.slice(0, 3)}
                            </Avatar>
                        }
                        onClick={() => setOpenDD(!openDD)}
                    />
                </Dropdown>
                </>
            }
        </div>
        </>
    );
};