import { createContext } from "react";
import { UserInfoInterface } from "../_helpers";

export type notificationType = 'success' | 'info' | 'warning' | 'error';

export type windowDimensionData = { width: number, height: number };

export interface GlobalContextInterface {
    isDarkMode: boolean;
    setIsDarkMode: (isDarkMode: boolean) => void;
    userInfo: UserInfoInterface | undefined;
    setUserInfo: (userInfo: UserInfoInterface) => void;
    windowDimension: windowDimensionData, 
    openNotification: (type: notificationType, key: string, message: string, description: string) => void;
};

const initialGlobalContextValue: GlobalContextInterface = {
    isDarkMode: false,
    setIsDarkMode: () => {},
    userInfo: {}, 
    setUserInfo: () => {},
    openNotification: () => {},
    windowDimension: { width: 0, height: 0 },
};

export const GlobalContext = createContext<GlobalContextInterface>(initialGlobalContextValue);