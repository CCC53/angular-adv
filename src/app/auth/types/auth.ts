
export interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    google: boolean;
}

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password2: string;
    terms: boolean;
}

export interface UserRes {
    token: string;
}

export interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}