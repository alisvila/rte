import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

export default function Navigation() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    <Nav.Link href="#home">ads</Nav.Link>
                    <Nav.Link href="#link">Gozaresh</Nav.Link>
                    <Nav.Link href="#link">Profile</Nav.Link>
                    <Nav.Link href="#link">Logout</Nav.Link>
                </Nav>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            </Navbar.Collapse>
        </Navbar>
    )
}
