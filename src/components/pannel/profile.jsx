import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Navigation from './navbar';
import { getUserData } from '../../services/services'


export default function Profile() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        getUserData().then(data => {
            setName(`${data.first_name} ${data.last_name}`)
            setPhone(data.phone)
            setEmail(data.email)
        })
        console.log('asd')
    }, [])

    return (
        <Container style={{ direction: 'rtl', textAlign: 'right' }}>
            <Navigation />
            <div className="pannel-wrapper">
                <Row>
                    <p className="col-md-6">{name}</p>
                </Row>
                <Row>
                    <p className="col-md-6">{phone}</p>
                </Row>
                <Row>
                    <p className="col-md-6">{email}</p>
                </Row>

                <hr />
                <Row>
                    <div className="form-group col-md-6">
                        <label for="inputEmail4">رمز عبور</label>
                        <input type="password" className="form-control" id="inputEmail4" placeholder="رمز" />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">رمز جدید</label>
                        <input type="password" className="form-control" id="inputPassword4" placeholder="رمز" />
                    </div>
                </Row>
            </div>
        </Container>
    )
}