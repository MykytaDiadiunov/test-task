import { Author, BookFromListRespose, CreateAuthor, CreateBook, SingleBookResponse, UpdateBookWithoutImage, User, UserLoginBody, UserRegisterBody } from "../models"
import { apiService } from "../services"
import { parseService } from "./parse"


export const requestService = () => {
    const parse = parseService()
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

    async function getAuthorById(authorId: number): Promise<Author> {
        return await api.get(`/author/${authorId}/`)
    }

    async function createAuthor(body: CreateAuthor): Promise<Author> {
        return await api.post("/author/", body)
    }

    async function updateAuthor(authorId: number, body: CreateAuthor) {
        return await api.patch(`/author/${authorId}/`, body)
    }

    async function deleteAuthor(authorId: number) {
        return await api.del(`/author/${authorId}/`)
    }

    //Book requests
    async function getBooks() : Promise<BookFromListRespose[]> {
        return await api.get("/book")
    }

    async function getBookById(bookId: number): Promise<SingleBookResponse> {
        return await api.get(`/book/${bookId}`)
    }

    async function getBooksByAuthors(authorIds: number[]): Promise<BookFromListRespose[]> {
        return await api.get("/book", {params: {authors: authorIds}})
    }

    async function createBook(body: CreateBook):  Promise<SingleBookResponse>{
        return await api.formPost("/book/", parse.createBookModelToFormData(body)) 
    }

    async function updateBook(bookId: number, bookBody: CreateBook): Promise<SingleBookResponse> {
        const urlPath = `/book/${bookId}/`
        if(bookBody.image === null) {
            const bookWithOutImageBody: UpdateBookWithoutImage = {
                name: bookBody.name,
                description: bookBody.description,
                author: bookBody.author
            }
            return await api.patch(urlPath, bookWithOutImageBody)
        } else {
            return await api.formPatch(urlPath, bookBody)
        }
    }

    
    async function deleteBook(bookId: number): Promise<void> {
        return await api.del(`/book/${bookId}/`)
    }

    return {
        getCurrentUser,
        register,
        login,
        logout,
        getAuthors,
        getAuthorById,
        updateAuthor,
        createAuthor,
        deleteAuthor,
        getBooks,
        getBookById,
        getBooksByAuthors,
        createBook,
        updateBook,
        deleteBook,
    }
}