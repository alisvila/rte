import React from 'react'
import { Container, Row, Col, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Navigation from './navbar';


export default function profile() {

    return (
        <Container style={{ direction: 'rtl', textAlign: 'right' }}>
            <Navigation />
            <div className="pannel-wrapper">
                <Row>
                    <p className="col-md-6">فیلان بیسار نژاد</p>
                </Row>
                <Row>
                    <p className="col-md-6">09353333333</p>
                </Row>
                <Row>
                    <p className="col-md-6">info@filan.com</p>
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