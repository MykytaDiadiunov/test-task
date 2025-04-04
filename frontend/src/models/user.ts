export interface CurrentUser {
    user: User,
    token: string
}

export interface User {
    id: number,
    username: string,
    email: string
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