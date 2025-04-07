export interface User {
    user: User
    id: number,
    username: string,
    email: string
    auth_token: string
}

export interface UserRegisterBody {
    username: string,
    email: string,
    password: string
}

export interface UserLoginBody {
    username: string,
    password: string
}