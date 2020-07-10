import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Navigation from './navbar';
import { getUserData } from '../../services/services'
import { changePass } from '../../services/services'


export default function Profile() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    useEffect(() => {
        getUserData().then(data => {
            setName(`${data.first_name} ${data.last_name}`)
            setPhone(data.phone)
            setEmail(data.email)
        })
        console.log('asd')
    }, [])

    const changeClick = () => {
        changePass(password, newPassword).then(res => {
            console.log('suc')
        }).catch(e => {
            console.log(e)
        })
    }

    const onChange = (e) => {
        switch (e.target.name) {
            case 'password':
                setPassword(e.target.value)
                break;
            case 'newpassword':
                setNewPassword(e.target.value)
                break;
            default:
                break;
        }
    }

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
                        <input value={password} name="password" type="password" className="form-control" id="inputEmail4" placeholder="رمز" onChange={onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">رمز جدید</label>
                        <input value={newPassword} name="newpassword" type="password" className="form-control" id="inputPassword4" placeholder="رمز" onChange={onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                        <button class="btn btn-primary" onClick={changeClick}>ثبت</button>
                    </div>
                </Row>
            </div>
        </Container>
    )
}