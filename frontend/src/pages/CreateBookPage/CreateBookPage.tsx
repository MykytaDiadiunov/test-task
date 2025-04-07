import BaseLayout from "@/layouts/BaseLayout/BaseLayout"
import ProtectedRoute from "@/layouts/ProtectedRoute/ProtectedRoute"
import { Author, CreateBook } from "@/models"
import { routes } from "@/router"
import { requestService } from "@/services"
import { Formik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"

function CreateBookPage() {
  const requests = requestService()
  const navigate = useNavigate()
  
  const defaultValues: CreateBook = {
    name: '',
    description: '',
    image: null,
    author: 0,
  }

  const [authors, setAuthors] = useState<Author[]>([])

  useEffect(() => {
    requests.getAuthors().then((response: Author[]) => {
      setAuthors(response)
    })
  }, [])

  async function createHandler(values: CreateBook) {
    await requests.createBook(values)
    navigate(routes.home.path)
  }

  return (
    <>
      <ProtectedRoute>
        <BaseLayout>
          <Formik onSubmit={createHandler} initialValues={defaultValues}>
            {({handleSubmit, setFieldValue}) => (
              <Form
                onSubmit={handleSubmit}
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
                    onChange={(e) => {setFieldValue("name", e.target.value)}}
                  />
                  <Label for="description">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    type="textarea"
                    onChange={(e) => {setFieldValue("description", e.target.value)}}
                  />
                  <Label for="image">
                    Image
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(e) => {
                      setFieldValue("image", e.target.files ? e.target.files[0] : null)
                    }}
                  />
                  <Label for="author">
                    Author
                  </Label>
                  <Input
                    id="author"
                    name="author"
                    type="select"
                    onChange={(e) => {setFieldValue("author", e.target.value)}}
                  >
                    <option value="0">
                    </option>
                    {authors.map((author: Author) => (
                      <option value={author.id} style={{color: "#000"}}>
                        {author.name}
                      </option>
                    ))}
                  </Input>
                  <Button
                    type='submit'
                    className='w-100 mt-3'
                  >
                    Create
                  </Button>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </BaseLayout>
      </ProtectedRoute>
    </>
  )
}

export default CreateBookPage