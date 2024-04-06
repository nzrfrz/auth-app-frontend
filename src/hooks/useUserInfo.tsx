import { 
    useContext, 
    useMemo, 
    useState 
} from "react";
import { logout } from "../api";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/contextCreate";

export const useUserInfo = () => {
    const navigateTo = useNavigate();
    const { userInfo, openNotification } = useContext(GlobalContext);
    
    const [openDD, setOpenDD] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    const tagColor = useMemo(() => {
        switch (true) {
            case userInfo?.userRole === "ENDUSER":
                return "lime";
            case userInfo?.userRole === "ADMIN":
                return "orange";
            default:
                return "red";
        }
    }, [userInfo]);

    const handleClickMenuDD = (path: string) => {
        navigateTo(path);
        setOpenDD(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigateTo("/login", { replace: true });
            openNotification("success", "logout", "Success", "You are logged out");
        } catch (error) {
            navigateTo("/login", { replace: true });
            openNotification("error", "logout", "Expired", "Your session is expired, please login again");
        }
    };

    return {
        userInfo,
        openDD, 
        tagColor,
        setOpenDD,
        navigateTo,
        handleLogout,
        handleClickMenuDD,
        showDrawer, 
        setShowDrawer,
    };
};