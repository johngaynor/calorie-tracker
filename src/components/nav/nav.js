import React, { useState, useEffect, useContext } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
} from "mdb-react-ui-kit";

import { AuthContext } from "../../utilities/auth/authContext";
import Login from "../auth/login";
import Signup from "../auth/signup";
import Logout from "../auth/logout";
import styles from "./nav.css";

function Navigation() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const pageLinks = Array.from(document.querySelectorAll(".nav-link"));
    const activePage = window.location.pathname;

    pageLinks.forEach((page) => {
      if (activePage == page.pathname) {
        page.classList.add("text-black");
      } else {
        page.classList.remove("text-black");
      }
    });
  }, []);

  const { currentUser } = useContext(AuthContext);

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">Calorie Tracker</MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarLink href="/">Dashboard</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/foods">Foods</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/recipes">Recipes</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/new-food">New Food</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/new-recipe">New Recipe</MDBNavbarLink>
            </MDBNavbarItem>

            {currentUser ? (
              <Logout />
            ) : (
              <>
                <MDBNavbarItem>
                  <Login />
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Signup />
                </MDBNavbarItem>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navigation;
