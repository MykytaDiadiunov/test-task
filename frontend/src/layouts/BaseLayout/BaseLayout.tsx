import { ReactNode } from "react"
import { useLocation } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { routes } from '../../router/index'
import './BaseLayout.css'

type LayoutProps = {
  children: ReactNode;
}

function BaseLayout({ children }: LayoutProps) {
  const isLoginPage: boolean = useLocation().pathname == routes.login.path

  return(
    <>
      <Navbar color="dark" dark>
        <NavbarBrand href={routes.home.path}>
          TestTask
        </NavbarBrand>
        <Nav navbar>
          <div className="navbar__wrapper">
          {!isLoginPage && <NavItem>
            <NavLink href={routes.login.path}>
              Login | Ragistration
            </NavLink>
          </NavItem>}
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