import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
    useParams
} from "react-router-dom";
import arvin from '../../logo.png'


export default function Navigation() {
    return (
        <Navbar className="pannel-nav" expand="lg" style={{marginTop: '5%'}}>
            <Navbar.Brand href="#home">
                <img src={arvin} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    <Link className="nav-link" to="/panel">تبلیغ</Link>
                    <Link className="nav-link" to="/panel/reports">گزارش</Link>
                    <Link className="nav-link" to="/panel/profile">پروفایل</Link>
                    <Link className="nav-link" to="/login">خروج</Link>
                </Nav>
                <Navbar.Brand href="#home" className="prifile-text">رامین عزیز خوش آمدی</Navbar.Brand>
            </Navbar.Collapse>
        </Navbar>
    )
}
