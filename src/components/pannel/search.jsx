import React from 'react'
import { Row, Col, Container, Form, FormControl, Button } from 'react-bootstrap';

export default function Search() {
    return (
        <div className="d-flex justify-content-center"  style={{marginTop: '5%'}}>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form>
        </div>
    )
}
