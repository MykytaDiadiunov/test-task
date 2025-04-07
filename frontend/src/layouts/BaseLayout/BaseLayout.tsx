import { ReactNode, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { Button, Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { routes } from '../../router/index'
import './BaseLayout.css'
import { useUserStore } from "@/store";

type LayoutProps = {
  children: ReactNode;
}

function BaseLayout({ children }: LayoutProps) {
  const userStore = useUserStore()

  const isAuthPage: boolean = 
  useLocation().pathname == routes.login.path || 
  useLocation().pathname == routes.register.path

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>()

  useEffect(() => {
    setIsAuthenticated(userStore.user !== null)
  }, [userStore.user])

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