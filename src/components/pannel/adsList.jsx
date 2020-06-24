import React from 'react'
import Card from '../share/card'
import { Row, Col, Container, Form, FormControl, Button } from 'react-bootstrap';


export default function AdsList() {
    const addNew = () => {
        console.log('clicked')
    }

    return (
        <div>
            <Row>
                <Col><Card onClick={addNew}/></Col>
                <Col><Card onClick={addNew}/></Col>
                <Col><Card onClick={addNew}/></Col>
            </Row>
            <Row style={{marginTop: '1rem'}}>
                {/* <Col><Card /></Col>
                <Col><Card /></Col>
                <Col><Card /></Col> */}
            </Row>

        </div>
    )


}
