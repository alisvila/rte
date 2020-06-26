import React from 'react'
import { Row, Col, Container, Form, FormControl, Button } from 'react-bootstrap';

export default function Search() {
    return (
        <div className="d-flex justify-content-center"  style={{marginTop: '5%', direction: 'rtl'}}>
            <Form inline>
                <Button className="btn-secondary">جستجو</Button>
                <FormControl type="text" placeholder="جستجو" className="mr-sm-2" />
            </Form>
        </div>
    )
}
