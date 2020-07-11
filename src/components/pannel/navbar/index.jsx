import React, {useEffect, useState} from 'react'
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
import { logout } from '../../../services/auth'
import JwtDecode from 'jwt-decode';



export default function Navigation() {
    const [accountName, setAccountName] = useState("")
    
    const history = useHistory();

    const exit = (e) => {
        console.log('exit')
        logout()
        history.push('/')
    }

    useEffect(() => {
        let token = localStorage.getItem('access_token')

        console.log(JwtDecode(token))
    }, [])
    return (
        <Navbar className="pannel-nav" expand="lg" style={{marginTop: '5%'}}>
            <Navbar.Brand href="#home">
                <img src={arvin} alt="avir logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    <Link className="nav-link" to="/panel">تبلیغ</Link>
                    <Link className="nav-link" to="/panel/reports">گزارش</Link>
                    <Link className="nav-link" to="/panel/profile">پروفایل</Link>
                    <span className="nav-link pointer" href="#" onClick={() => exit()}>خروج</span>
                </Nav>
                <Navbar.Brand href="#home" className="prifile-text">رامین عزیز خوش آمدی</Navbar.Brand>
            </Navbar.Collapse>
        </Navbar>
    )
}
