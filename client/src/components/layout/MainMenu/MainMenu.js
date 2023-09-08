import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink  } from 'reactstrap';
import { FaBars } from 'react-icons/fa';
import './MainMenu.scss';
import { useState } from 'react';

import Logo from '../../common/Logo/Logo'

const MainMenu = () => {

 const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <Navbar expand="md" className="animated fadeIn">
        <NavbarBrand href="/">
          <Logo />
        </NavbarBrand>
        <NavbarToggler className="position-absolute" onClick={toggle}>
          <FaBars />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto align-items-center" navbar>
            <NavItem>
              <NavLink href="/">Browse</NavLink>
            </NavItem>
            <NavItem className="d-block d-md-none d-xl-block">
              <NavLink href="/privacy-policy">Privacy Policy</NavLink>
            </NavItem>
            <NavItem className="d-block d-md-none d-xl-block">
              <NavLink href="/terms-of-use">Term of use</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/submit">
                <Button className="btn-pill" outline color="primary">Submit Photo</Button>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MainMenu;
