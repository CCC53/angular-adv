
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
}

export interface UpdateUserResp {
    updated: boolean;
}