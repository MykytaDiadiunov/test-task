import { Author, BookFromListRespose, User, UserLoginBody, UserRegisterBody } from "../models"
import { apiService } from "../services"


export const requestService = () => {
    const api = apiService()
    const apiUser = apiService("http://127.0.0.1:8000/user")

    //User requests
    async function getCurrentUser() : Promise<User> {
        return await apiUser.get(`/current/`)   
    }
    
    async function register(userRegisterBody: UserRegisterBody) : Promise<User> {
        return await apiUser.post("/register/", userRegisterBody)   
    }

    async function login(userLoginBody: UserLoginBody) : Promise<User> {
        return await apiUser.post("/login/", userLoginBody)   
    }

    async function logout() : Promise<void> {
        return await apiUser.del("/logout/")   
    }

    //Author requsts
    async function getAuthors(): Promise<Author[]> {
        return await api.get("/author")
    }

    //Book requests
    async function getBooks() : Promise<BookFromListRespose[]> {
        return await api.get("/book")
    }

    async function getBooksByAuthors(authorIds: number[]) {
        return await api.get("/book", {params: {authors: authorIds}})
    }

    return {
        getCurrentUser,
        register,
        login,
        logout,
        getAuthors,
        getBooks,
        getBooksByAuthors
    }
}