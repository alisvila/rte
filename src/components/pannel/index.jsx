import React from 'react'
import { Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Navigation from './navbar'
import AdsList from './adsList'
import Search from './search'


export default function index() {
    return (

        <Container>
            <Navigation />
            <Search />
            <AdsList />
        </Container>
    )
}
