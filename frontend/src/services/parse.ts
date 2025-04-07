import { CreateBook } from "@/models"

export const parseService = () => {

    function createBookModelToFormData(obj: CreateBook): FormData {
        const formData: FormData = new FormData()
        formData.append("name", obj.name)
        formData.append("description", obj.description)
        if(obj.image) {
            formData.append("image", obj.image)
        }
        formData.append("author", obj.author.toString())

        return formData;
    }

    return {
        createBookModelToFormData
    }
}