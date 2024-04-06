import { Route, Routes } from "react-router-dom";

import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

import { 
    Login, 
    Register, 
    UserList, 
    ForgotPassword, 
    ActivatingAccount, 
    AccountActivationNotif,
    ResetPassword,
    Setting,
    UserProfile, 
} from "../pages";

import { GlobalLayout } from "../_components";

export const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PublicRoute />} >
                <Route path="/" element={<GlobalLayout withNavbar={false} showFloatingThemeToggler={true} />} >
                    <Route index path={"/login"} element={<Login />} />
                    <Route path={"/register"} element={<Register />} />
                    <Route path={"/forgot-password"} element={<ForgotPassword />} />
                </Route>
            </Route>

            <Route path="/" element={<PrivateRoute />} >
                <Route path="/" element={<GlobalLayout withNavbar={true} showNavbarThemeToggler />} >
                    <Route index path={"/"} element={<UserList />} />
                    <Route index path={"/setting"} element={<Setting />} />
                    <Route index path={"/user-profile"} element={<UserProfile />} />
                </Route>
            </Route>

            <Route path="/" element={<GlobalLayout withNavbar={false} showFloatingThemeToggler={true} />} >
                <Route path={"/account-activation-notif"} element={<AccountActivationNotif />} />
                <Route path={"/activating-account/:token"} element={<ActivatingAccount />} />
                <Route path={"/reset-password/:token"} element={<ResetPassword />} />
            </Route>
        </Routes>
    );
};