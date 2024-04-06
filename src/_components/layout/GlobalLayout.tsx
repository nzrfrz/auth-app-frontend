import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { GlobalContext } from "../../context/contextCreate";

import { Layout } from "antd";
import { NavbarMenu } from "../navbarMenu/NavbarMenu";
import { ThemeToggler } from "../ThemeToggler";

import brandImage from "../../assets/image/rizdev-logo-v2.png";
import styles from "../../_styles/GlobalLayout.module.css";

const { Header, Content } = Layout;

interface GlobalLayoutInterface {
    withNavbar?: boolean;
    showFloatingThemeToggler?: boolean;
    showNavbarThemeToggler?: boolean;
};

export const GlobalLayout: React.FC<GlobalLayoutInterface> = ({withNavbar, showFloatingThemeToggler}) => {
    const { windowDimension } = useContext(GlobalContext);

    return (
        <Layout style={{ width: "100%", height: windowDimension.height }}>
            <Header 
                style={{ 
                    display: withNavbar === true ? "flex" : "none", 
                    flexDirection: "row", 
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                }}
            >
                <div className={styles.brandImageWrapper}>
                    <img src={brandImage} width={40} height={40} />
                    <span>Auth App</span>
                </div>
                <NavbarMenu />
            </Header> 
            <Content style={{ height: "100%" }}>
                <Outlet />
            </Content>

            { 
                showFloatingThemeToggler === true ? 
                <div
                    style={{
                        position: "absolute",
                        right: 20,
                        bottom: 10
                    }}
                >
                    <ThemeToggler />
                </div>
                : 
                null 
            }
        </Layout>
    );
};