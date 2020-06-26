import React, { useState, useEffect } from 'react';
import Card from '../share/card'
import plc1 from './plc1.jpg'
import plc2 from './plc2.jpg'
import add from './add.png'
import { Row, Col, Container, Form, FormControl, Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";


export default function AdsList() {
    const [list, setList] = useState([plc1, plc2]);
    const history = useHistory();

    const routeChange = () => {
        let path = `panel/newad`;
        history.push(path);
    }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        console.log(list.length)


        // Update the document title using the browser API
    });

    const addNew = () => {
        console.log('clicked')
    }

    return (
        <div style={{ marginTop: '5%' }}>

            <Row>
                <Col>
                    <Card onClick={routeChange}>
                        <img src={add} alt="plx1" />
                    </Card>
                </Col>

                {list.map((item, index) => {
                    console.log(item, index)
                    return (
                        <Col key={index}>
                            <Card onClick={addNew}>
                                <img src={item} alt="plx1" />
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            <Row style={{ marginTop: '1rem' }}>
            </Row>


        </div>
    )
}
