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
    // var objArray = []
    const [list, setList] = useState([]);
    const [objArray, setobjArray] = useState([]);
    const [imageObj, setImageObj] = useState({
        id: '',
        image: ''
    });
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const routeChange = () => {
        let path = `panel/newad`;
        history.push(path);
    }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {

        getAllAd().then(json => {
            setList(json)
            setobjArray(json)
            console.log(json)
            json.map((item, index) => {
                imageHandler(item.id)
            })
        })
    }, []);

    const addNew = (e) => {
        history.push(`panel/editad/${e.target.name}`)
    }

    const imageHandler = (id) => {
        console.log(objArray)
        console.log('filan')
        getVideoImage(id, function(dataUrl) {
            objArray.map(item => {
                console.log(objArray)
                if (item.id === id) {
                    // TODO: change tsi
                    item.image = dataUrl
                }
                console.log(loading)
                setLoading(false)

            })
            // console.log('RESULT:', dataUrl)
            // setImageObj({
            //     ...imageObj,
            //     id,
            //     image: dataUrl
            // })
          })
        //   .then(data => {
        //     console.log('in then', imageObj, id, data, loading)
        //     setImageObj({
        //         ...imageObj,  
        //         id,
        //         image: data 
        //    })
        // })
    }

    const enabled = { border: '3px solid green', borderRadius: '5px' }
    const disabled = { border: '3px solid red', borderRadius: '5px' }
    return (
        <div style={{ marginTop: '5%' }}>
            {loading ? 'wait' : 'go'}

            <Row>
                <Col md={4}>
                    <Card onClick={routeChange}>
                        <img src={add} alt="plx1" />
                    </Card>
                </Col>

                {objArray.map((item, index) => {
                    console.log(item)
                    item.image = place
                    return (
                        <Col key={item.id} md={4}>
                            <Card onClick={addNew} name={item.id} style={item.enabled ? enabled : disabled}>
                                <img src={item.image} alt={item.description} name={item.id}/>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}
