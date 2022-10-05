
export interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    google: boolean;
}

export interface UpdateProfileForm {
    name: string;
    email: string;
    google: boolean;
    role: string;
}

export interface UpdateUserResp {
    updated: boolean;
}

export interface GetUsersResp {
    total: number;
    users: User[];
}

export interface DeleteUserResp {
    deleted: boolean;
}