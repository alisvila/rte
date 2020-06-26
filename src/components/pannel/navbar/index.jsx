import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

export default function Navigation() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    <Nav.Link href="#home">تبلیغ</Nav.Link>
                    <Nav.Link href="#link">گزارش</Nav.Link>
                    <Nav.Link href="#link">پروفایل</Nav.Link>
                    <Nav.Link href="#link">خروج</Nav.Link>
                </Nav>
                <Navbar.Brand href="#home">آویر</Navbar.Brand>
            </Navbar.Collapse>
        </Navbar>
    )
}
