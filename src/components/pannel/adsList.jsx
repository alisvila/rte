import React, { Component } from 'react'
import Card from '../share/card'
import { withRouter } from "react-router-dom";
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
import Search from './search'


class AdsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            objArray: [],
            imageObj: {
                id: '',
                image: ''
            },
            loading: true
        }
        this.imageHandler = this.imageHandler.bind(this)
    }
    componentDidMount() {
        getAllAd().then(json => {
            this.setState({
                list: json,
                objArray: json
            })
            json.map((item, index) => {
                this.imageHandler(item.id)
            })
        })
    }

    routeChange = () => {
        let path = `panel/newad`;
        this.props.history.push(path);
    }

    imageHandler(id) {
        let obj = this.state.list
        getVideoImage(id, (dataUrl) => {
            obj.map((item, index) => {
                console.log('map')
                if (item.id === id) {
                    if (dataUrl === 'fail') {
                        obj[index].image = place
                    }
                    else {
                        obj[index].image = dataUrl
                    }
                    console.log('get image suc', obj)
                }
                this.setState({
                    list: obj
                })
            })
        })

    }

    addNew = (e) => {
        this.props.history.push(`panel/editad/${e.target.name}`)
    }

    searched = (list) => {
        this.setState({list})
    }

    render() {
        console.log('render')
        const enabled = { border: '3px solid green', borderRadius: '5px' }
        const disabled = { border: '3px solid red', borderRadius: '5px' }
        return (
            <>
                <Search list={this.state.objArray} searched={this.searched}/>
                <div style={{ marginTop: '5%' }}>

                    <Row>
                        <Col md={3}>
                            <Card onClick={this.routeChange}>
                                <img src={add} alt="plx1" />
                            </Card>
                        </Col>

                        {this.state.list.map((item, index) => {
                            return (
                                <Col key={item.id} md={3}>
                                    <Card onClick={this.addNew} name={item.id} style={item.enabled ? enabled : disabled}>
                                        <img src={item.image} alt={item.description} name={item.id} style={{width: '100%'}} />
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </>
        )
    }
}

export default withRouter(AdsList)
