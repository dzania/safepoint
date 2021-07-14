import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.css";

export default function Navigation() {
  return (
    <div>
      <Navbar expand="lg" variant="dark" bg="none" fixed="top">
        <Container>
            <Navbar.Brand
              style={{ fontSize: "4rem", color: "#fff", fontWeight: 600 }}
            >
              Safe<span style={{ color: "#00FF48" }}>Point.</span>
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link classname="color-link" href="login">Login</Nav.Link>
              <Nav.Link href="register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
