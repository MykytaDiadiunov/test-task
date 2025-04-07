import { Author } from "@/models";

export interface BookFromListRespose {
    id: number,
    name: string,
    description: string,
    image: string | null,
    author: number
}

export interface SingleBookResponse {
    id: number,
    name: string,
    description: string,
    image: string | null,
    author: number,
    author_object: Author
}

export interface CreateBook {
    name: string,
    description: string,
    image: File | null,
    author: number
}

export interface UpdateBookWithoutImage {
    name: string,
    description: string,
    author: number
}