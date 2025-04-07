import HomePage from '@/pages/HomePage/HomePage'
import LoginPage from '@/pages/LoginPage/LoginPage'
import RegisterPage from '@/pages/RegisterPage/RegisterPage'
import CreateAuthorPage from '@/pages/CreateAuthorPage/CreateAuthorPage'
import CreateBookPage from '@/pages/CreateBookPage/CreateBookPage'
import BookDetailsPage from '@/pages/BookDetailsPage/BookDetailsPage'
import EditBookPage from '@/pages/EditBookPage/EditBookPage'
import AuthorsPage from '@/pages/AuthorsPage/AuthorsPage'
import EditAuthorPage from '@/pages/EditAuthorPage/EditAuthorPage'

export const routes = {
  home: { path: "/", name: "Home", element: <HomePage /> },
  login: { path: "/auth/login", name: "Login", element: <LoginPage /> },
  register: { path: "/auth/register", name: "Register", element: <RegisterPage /> },
  createAuthor: { path: "/create/author", name: "CreateAuthor", element: <CreateAuthorPage /> },
  createBook: { path: "/create/book", name: "CreateBook", element: <CreateBookPage /> },
  bookDetails: { path: "/book/:id", name: "BookDetails", element: <BookDetailsPage /> },
  editBook: { path: "/edit/book/:id", name: "EditBook", element: <EditBookPage /> },
  authors: { path: "/authors", name: "Authors", element: <AuthorsPage /> },
  editAuthors: { path: "/edit/author/:id", name: "EditAuthors", element: <EditAuthorPage /> },
}