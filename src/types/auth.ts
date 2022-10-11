import { SideBarMenu } from "./shared";
import { User } from "./user";

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password2: string;
    terms: boolean;
}

export interface UserLoginRes {
    token: string;
    menu: SideBarMenu[];
}

export interface UserRenewTokenRes {
    token: string;
    user: User;
    menu: SideBarMenu[];
}

export interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

export interface TokenDecoded {
    user: User;
    iat: number;
    exp: number;
}