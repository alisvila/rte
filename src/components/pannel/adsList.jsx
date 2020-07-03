import React, { useState, useEffect } from 'react';
import Card from '../share/card'
import plc1 from './plc1.jpg'
import place from '../place.png'
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
import { getAllAd, getVideoImage } from '../../services/services'


export default function AdsList() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const routeChange = () => {
        let path = `panel/newad`;
        history.push(path);
    }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        getAllAd().then(json => setList(json))
        console.log(list)
        
    }, []);

    const addNew = (e) => {
        console.log(e)
        history.push(`panel/editad/${e.target.name}`)
        console.log('clicked')
    }

    const enabled = { border: '3px solid green', borderRadius: '5px' }
    const disabled = {border: '3px solid red', borderRadius: '5px'}
    return (
        <div style={{ marginTop: '5%' }}>

            <Row>
                <Col md={4}>
                    <Card onClick={routeChange}>
                        <img src={add} alt="plx1" />
                    </Card>
                </Col>

                {list.map((item, index) => {
                    if (!item.image) {
                        item.image = place
                    }
                    item.image = getVideoImage(item.id)
                    return (
                        <Col key={item.id} md={4}>
                            <Card onClick={addNew} name={item.id} style={item.enabled ? enabled : disabled}>
                                <img src={item.image} alt={item.description} />
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}
