import { Author } from "@/models";

export interface BookFromListRespose {
    id: number,
    name: string,
    description: string,
    image: string,
    author: number
}

export interface SingleBookResponse {
    id: number,
    name: string,
    description: string,
    image: string,
    author: Author
}