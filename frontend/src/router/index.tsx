import HomePage from '@/pages/HomePage/HomePage'
import LoginPage from '@/pages/LoginPage/LoginPage'
import RegisterPage from '@/pages/RegisterPage/RegisterPage'
import CreateAuthorPage from '@/pages/CreateAuthorPage/CreateAuthorPage'

export const routes = {
  home: { path: "/", element: <HomePage /> },
  login: { path: "/auth/login", element: <LoginPage /> },
  register: { path: "/auth/register", element: <RegisterPage />},
  createAuthor: { path: "/create/author", element: <CreateAuthorPage />}
}