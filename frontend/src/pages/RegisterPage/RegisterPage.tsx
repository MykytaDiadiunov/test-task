import BaseLayout from "@/layouts/BaseLayout/BaseLayout"
import { UserRegisterBody } from "@/models"
import { routes } from "@/router"
import { useUserStore } from "@/store"
import { Formik } from "formik"
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"


function RegisterPage() {
  const navigate = useNavigate()
  const userStore = useUserStore()
  const defaultValues: UserRegisterBody = {
    username: '',
    email: '',
    password: '',
  }

  async function registerHandler(values: UserRegisterBody) {
    await userStore.register(values)
    navigate(routes.home.path)
  }

  return (
    <>
      <BaseLayout>
        <Formik onSubmit={registerHandler} initialValues={defaultValues}>
          {({handleSubmit, setFieldValue}) => (
            <div className="w-100 pt-3">
              <Form 
                className='d-flex justify-content-center w-100'
                onSubmit={handleSubmit}
              >
                <FormGroup>
                  <Label for="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="example@email.com"
                    type="email"
                    onChange={(e) => {setFieldValue("email", e.target.value)}}
                  />
    
                  <Label for="username">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    onChange={(e) => {setFieldValue("username", e.target.value)}}
                  />
    
                  <Label for="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => {setFieldValue("password", e.target.value)}}
                  />          
                  <span>Alrady have accaunt? <a href={routes.login.path}>Login</a>!</span>
                  <Button 
                    className="w-100 mt-3"
                  >
                    Register
                  </Button>
                </FormGroup>
              </Form>
            </div>
          )}
        </Formik>
      </BaseLayout>
    </>
  )
}

export default RegisterPage