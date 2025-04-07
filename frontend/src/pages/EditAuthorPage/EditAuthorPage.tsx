import BaseLayout from "@/layouts/BaseLayout/BaseLayout"
import ProtectedRoute from "@/layouts/ProtectedRoute/ProtectedRoute"
import { Author } from "@/models"
import { routes } from "@/router"
import { requestService } from "@/services"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"


function EditAuthorPage() {
  const requests = requestService()
  const navigate = useNavigate()

  const authorId = useParams().id

  const [name, setName] = useState<string>("")
  const [birthday, setBirthday] = useState<string>("")

  useEffect(() => {
    requests.getAuthorById(Number(authorId)).then((response: Author) => {
      setName(response.name)
      setBirthday(response.birthday)
    })

  }, [])

  async function editHandler() {
    let body = {
      name: name,
      birthday: birthday
    }
    console.log(body)
    await requests.updateAuthor(Number(authorId), body)
    navigate(routes.authors.path)
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
                defaultValue={name}
                onChange={(e) => {setName(e.target.value)}}
              />
              <Label for="birthday">
                Birthday
              </Label>
              <Input
                id="birthday"
                name="birthday"
                type="date"
                onChange={(e) => setBirthday(e.target.value)}
              />
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

export default EditAuthorPage