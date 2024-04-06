export type validateStatus = "" | "success" | "warning" | "error" | "validating" | undefined;

export interface UserListInterface {
    meta?: {
        limit?: number,
        page?: number,
        per_page?: number,
        totalPage?: number
    };
    userList?: UserInfoInterface[]
};

export interface UserInfoInterface {
    empty?: boolean;
    id?: string;
    userID?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    userRole?: string;
    isActivated?: boolean;
    createdAt?: string;
    updatedAt?: string;
    avatarColor?: string;
    avatarImage?: {
        id?: string,
        url?: string,
    };
};

interface SuccessResponseData extends UserListInterface, UserInfoInterface {}

export interface ResponseInterface {
    data?: {
        data?: SuccessResponseData,
        isActivated?: boolean,
        status?: number,
        message?: string,
    } | undefined | null;
    status?: string | number | undefined | null;
    statusText?: string | undefined | null;
    message?: string | undefined;
    response?: {
        data?: {
            data?: { [x: string]: any },
            status?: number,
            message?: string,
        };
        status?: number | undefined | null;
        statusText?: string | undefined | null;
    } | undefined | null;
    error?: {
        response?: {
            data?: {
                data?: { [x: string]: any },
                status?: number | undefined | null;
                message?: string | undefined | null,
            }
            status?: number | null | undefined;
            message?: string | undefined | null;
        }
    } | undefined | null;
    isFetching?: boolean;
    isLoading?: boolean;
};