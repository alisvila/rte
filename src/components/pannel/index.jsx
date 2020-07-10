import React from 'react'
import { Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Navigation from './navbar'
import AdsList from './adsList'


export default function index() {
    return (

        <Container style={{marginTop: '5%'}}>
            <Navigation />
            <AdsList />
        </Container>
    )
}
