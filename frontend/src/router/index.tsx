import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'

export const routes = {
  home: { path: "/", element: <HomePage /> },
  login: { path: "/auth/login", element: <LoginPage /> },
};