import { ReactNode, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { routes } from '@/router'
import './BaseLayout.css'
import { useUserStore } from "@/store";

type LayoutProps = {
  children: ReactNode;
}

function BaseLayout({ children }: LayoutProps) {
  const userStore = useUserStore()
  const navigate = useNavigate()

  const isAuthPage: boolean = 
  useLocation().pathname == routes.login.path || 
  useLocation().pathname == routes.register.path

  const isCreateBookPage = useLocation().pathname != routes.createBook.path
  const isCreateAuthorPage = useLocation().pathname != routes.createAuthor.path

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>()

  useEffect(() => {
    setIsAuthenticated(userStore.user !== null)
  }, [userStore.user])

  function addNewAuthorHandler() {
    navigate(routes.createAuthor.path)
  }

  function addNewBookHandler() {
    navigate(routes.createBook.path)
  } 

  function goToAuthorsPageHandler() {
    navigate(routes.authors.path)
  }

  return(
    <>
      <Navbar color="dark" dark>
        <NavbarBrand href={routes.home.path}>
          TestTask
        </NavbarBrand>
        <Nav navbar>
          <div className="navbar__wrapper">
            {isAuthPage || !isAuthenticated && 
              <NavItem>
                <NavLink href={routes.login.path}>
                  Login | Ragistration
                </NavLink>
              </NavItem>
            }
            { isAuthenticated && isCreateBookPage &&
              <Button 
                className="mx-3" 
                color="primary" 
                onClick={goToAuthorsPageHandler}
              >
                Authors
              </Button>
            }
            { isAuthenticated && isCreateBookPage &&
              <Button 
                className="mx-3" 
                color="info" 
                onClick={addNewBookHandler}
              >
                Add new book
              </Button>
            }
            { isAuthenticated && isCreateAuthorPage &&
              <Button 
                className="mx-3"
                color="warning" 
                onClick={addNewAuthorHandler}
                >
                Add new author
              </Button>
            }
            { isAuthenticated &&
              <Button onClick={userStore.logout}>Logout</Button>
            }
          </div>
        </Nav>
      </Navbar>
      <main>
        <div className="content">
          { children }
        </div>
      </main>
      <footer>Footer Content</footer>
    </>
  )
}

export default BaseLayout