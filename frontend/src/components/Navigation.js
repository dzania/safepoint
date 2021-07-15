import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.css";
import {Link} from 'react-router-dom';

export default function Navigation() {
  return (
      <div>
        <Navbar expand="lg" variant="dark" bg="none">
          <Container>
            <Navbar.Brand as={Link} to={'/'}
              style={{ fontSize: "4rem", color: "#fff",position:"sticky", fontWeight: 500 }}
            >
              Safe<span style={{ color: "#00FF48" }}>Point.</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link
                  as={Link}
                  to={"/login"}
                >
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to={"/register"}>
                  Register
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </div>
  );
}
