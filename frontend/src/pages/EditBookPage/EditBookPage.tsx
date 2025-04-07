import BaseLayout from "@/layouts/BaseLayout/BaseLayout"
import ProtectedRoute from "@/layouts/ProtectedRoute/ProtectedRoute"
import { Author, SingleBookResponse } from "@/models"
import { routes } from "@/router"
import { requestService } from "@/services"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FormGroup, Label, Input, Button, Form } from "reactstrap"

function EditBookPage() {
  const requests = requestService()
  const navigate = useNavigate()

  const bookId = useParams().id

  const [authors, setAuthors] = useState<Author[]>([])

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [image, setImage] = useState<File | null>(null)
  const [author, setAuthor] = useState<number>(0)

  useEffect(() => {
    requests.getAuthors().then((response: Author[]) => {
      setAuthors(response)
    })

    requests.getBookById(Number(bookId)).then((response: SingleBookResponse) => {
      setName(response.name)
      setDescription(response.description)
      setAuthor(response.author)
    })

  }, [])

  async function editHandler() {
    let body = {
      name: name,
      description: description,
      image: image,
      author: author,
    }
    await requests.updateBook(Number(bookId), body)
    navigate(routes.home.path)
  }

  return (
    <>
      <ProtectedRoute>
        <BaseLayout>
          <Form
            className='d-flex justify-content-center w-100 pt-3'
          >
            <FormGroup>
              <Label for="name">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => {setName(e.target.value)}}
              />
              <Label for="description">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                type="textarea"
                value={description}
                onChange={(e) => {setDescription(e.target.value)}}
              />
              <Label for="image">
                Image
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={(e) => {
                  setImage(e.target.files ? e.target.files[0] : null)
                }}
              />
              <Label for="author">
                Author
              </Label>
              <Input
                id="author"
                name="author"
                type="select"
                value={author}
                onChange={(e) => {setAuthor(Number(e.target.value))}}
              >
                <option value="0">
                </option>
                {authors.map((author: Author) => (
                  <option value={author.id} style={{color: "#000"}} key={author.id}>
                    {author.name}
                  </option>
                ))}
              </Input>
              <Button
                className='w-100 mt-3'
                onClick={editHandler}
              >
                Update
              </Button>
            </FormGroup>
          </Form>
        </BaseLayout>
      </ProtectedRoute>
    </>
  ) 
}

export default EditBookPage
