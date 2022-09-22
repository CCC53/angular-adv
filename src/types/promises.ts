
export interface UserTest {
    id: number;
    email: string;
    avatar: string;
    first_name: string;
    last_name: string;
}

export interface Response {
    data: UserTest[];
}