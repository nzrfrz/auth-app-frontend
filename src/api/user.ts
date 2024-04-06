import { UserInfoInterface } from "../_helpers";
import { request } from "./axiosInstance";

export const getUserPaginated = async (limitPerPage: number, page: number, querySearch: string | null) => {
    const response = await request.get(`/user/paginated-search/?limit=${limitPerPage}&page=${page}&per_page=${limitPerPage}&q=${querySearch}`);
    return response.data;
};

export const getUserProfile = async () => {
    const results = await request.get("/user/profile/");
    return results.data;
};

export const changeProfileUsernameAndEmail = async (payload: UserInfoInterface | undefined) => {
    const results = await request.put("/user/change-profile/username-email/", payload);
    return results.data;
};

export const changeProfilePassword = async (payload: UserInfoInterface | undefined) => {
    const results = await request.put("/user/change-profile/password/", payload);
    return results.data;
};

export const editUser = async (args: UserInfoInterface) => {
    const { userID, ...rest } = args;
    const idParams = args.userID;
    
    const results = await request.put(`/user/edit/id=${idParams}/`, rest);
    return results.data;
};

export const deleteUser = async (userID: string | undefined) => {
    const response = await request.delete(`/user/delete/id=${userID}/`);
    return response.data;
};