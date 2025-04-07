import BaseLayout from "@/layouts/BaseLayout/BaseLayout"
import ProtectedRoute from "@/layouts/ProtectedRoute/ProtectedRoute"
import { CreateAuthor } from "@/models"
import { routes } from "@/router"
import { requestService } from "@/services"
import { Formik } from 'formik'
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"

function CreateAuthorPage() {
  const navigate = useNavigate()
  const request = requestService()
  const defaultValues: CreateAuthor = {
    name: '',
    birthday: ''
  }

  async function createHandler(values: CreateAuthor) {
    await request.createAuthor(values)
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
                <Label for="birthday">
                  Birthday
                </Label>
                <Input
                  id="birthday"
                  name="birthday"
                  type="date"
                  onChange={(e) => {setFieldValue("birthday", e.target.value)}}
                />
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

export default CreateAuthorPage