import { BookFromListRespose, CurrentUser, UserLoginBody, UserRegisterBody } from "../models"
import { apiService } from "../services"


export const requestService = () => {
    const api = apiService()

    //User requests
    async function getCurrentUser() : Promise<CurrentUser> {
        return await  api.get("/user/me/")   
    }
    
    async function register(userRegisterBody: UserRegisterBody) : Promise<CurrentUser> {
        return await  api.post("/user/register/", userRegisterBody)   
    }

    async function login(userLoginBody: UserLoginBody) : Promise<CurrentUser> {
        return await  api.post("/user/login/", userLoginBody)   
    }

    async function logout() : Promise<void> {
        return await  api.post("user/logout/")   
    }

    //Book requests
    async function getBooks() : Promise<BookFromListRespose[]> {
        return await api.get("/book")
    }

    return {
        getCurrentUser,
        register,
        login,
        logout,
        getBooks
    }
}