import BaseLayout from '@/layouts/BaseLayout/BaseLayout'
import { UserLoginBody } from '@/models'
import { routes } from '@/router'
import { useUserStore } from '@/store'
import { Button, FormGroup, Input, Label, Form } from 'reactstrap'
import { Formik } from 'formik'
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const userStore = useUserStore()
  const navigate = useNavigate()

  const defaultValues: UserLoginBody = {
    username: '',
    password: '',
  }

  async function loginHandler(values: UserLoginBody) {
    await userStore.login(values)
    navigate(routes.home.path)
  }

  return (
    <>
      <BaseLayout>
        <Formik onSubmit={loginHandler} initialValues={defaultValues}>
          {({handleSubmit, setFieldValue}) => (
            <div className="w-100 pt-3">
              <Form
                onSubmit={handleSubmit}
                className='d-flex justify-content-center w-100'
              >
                <FormGroup>
                  <Label for="username">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    onChange={(e) => {setFieldValue("username", e.target.value)}}
                  />
                  <Label
                    className='mt-2'
                    for="password"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className='mb-2'
                    onChange={(e) => {setFieldValue("password", e.target.value)}}
                  />        
                  <div className='d-flex flex-column'>
                    <span>Dont have accaunt?</span>
                    <a href={routes.register.path}>
                      Register!
                    </a>
                  </div>
                  <Button
                    type='submit'
                    className='w-100 mt-3'
                  >
                    Login
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

export default LoginPage
