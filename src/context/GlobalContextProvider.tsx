import { useEffect, useState } from "react";
import { GlobalContext, notificationType, windowDimensionData } from "./contextCreate";
import { theme, ConfigProvider, notification } from "antd";
import { themeToken, themeComponents } from "../themeToken";
import { UserInfoInterface } from "../_helpers";

export const GlobalContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [api, contextHolder] = notification.useNotification();

    const [userInfo, setUserInfo] = useState<UserInfoInterface | undefined>(undefined);
    const [windowDimension, setWindowDimension] = useState<windowDimensionData>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const openNotification = (type: notificationType, key: string, message: string, description: string) => {
        api[type]({
            key,
            message,
            description,
            placement: "bottomRight",
        });
    };

    const getWindowSize = () => {
        setWindowDimension({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener("resize", getWindowSize);

        return () => {
            window.removeEventListener('resize', getWindowSize);
        }
    }, [window]);

    const contextValues = {
        isDarkMode,
        setIsDarkMode,
        userInfo, 
        setUserInfo,
        openNotification,
        windowDimension,
    };

    return (
        <GlobalContext.Provider value={contextValues}>
            <ConfigProvider
                theme={{
                    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                    token: themeToken(isDarkMode),
                    ...themeComponents()
                }}
            >
                {contextHolder}
                {children}
            </ConfigProvider>
        </GlobalContext.Provider>
    );
};