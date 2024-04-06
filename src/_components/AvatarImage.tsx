import { Avatar } from "antd";
import { useMemo } from "react";
import { UserInfoInterface } from "../_helpers";

interface AvatarInterface {
    userInfo?: UserInfoInterface | undefined;
}

export const AvatarImage = ({ userInfo }: AvatarInterface) => {
    
    const renderUsername = useMemo(() => {
        return userInfo?.username?.slice(0, 3);
    }, [userInfo]);

    const renderAvatarImage = useMemo(() => {
        if (userInfo?.avatarImage?.url === "" || userInfo?.avatarImage?.url === undefined) return undefined;
        else return userInfo?.avatarImage?.url;
    }, [userInfo]);

    const renderAvatarColor = useMemo(() => {
        if (userInfo?.avatarImage?.url === "" || userInfo?.avatarImage?.url === undefined) return userInfo?.avatarColor;
        else return undefined;
    }, [userInfo]);

    return (
        <Avatar 
            gap={4}
            size="large"
            src={renderAvatarImage}
            style={{
                backgroundColor: renderAvatarColor,
                verticalAlign: 'middle'
            }} 
        >
            {renderUsername}
        </Avatar>
    );
};