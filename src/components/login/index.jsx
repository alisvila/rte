import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { auth } from '../../services/services'

import avir from '../logo.png'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";


export default function Login() {

    const [list, setList] = useState([]);
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('avir');
    const history = useHistory();


    const routeChange = () => {
        let res = auth(username, password)
        console.log(res)
        let path = "/panel"

    }

    const login = async (e) => {
        e.preventDefault() 

        auth(username, password).then(data => {
            console.log(data)
            history.push('panel')
        }).catch(e => {
            console.log(e)
        })
    }

    const onChange = (e) => {
        switch (e.target.name) {
            case 'username':
                setUsername(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
                break;
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="login-wrapper">
                    <form className="form-signin">
                        <img className="mb-4 logo" src={avir} alt="" />
                        <label className="sr-only">آدرس ایمیل</label>
                        <input type="text"
                            value={username}
                            name="username"
                            id="inputEmail"
                            className="form-control"
                            placeholder="آدرس ایمیل"
                            required
                            autoFocus
                            onChange={onChange}
                        />
                        <label className="sr-only">روز عبور</label>
                        <input type="password"
                            value={password}
                            name="password"
                            id="inputPassword"
                            className="form-control"
                            placeholder="رمز عبور"
                            required
                            onChange={onChange}
                        />
                        <div className="checkbox mb-3">
                            {/* <label>
                                <input type="checkbox" value="remember-me" />مرا به خاطر بسپار
                            </label> */}
                        </div>
                        <button className="btn btn-lg btn-block btn-primary" onClick={login}>ورود</button>
                        <p className="error" id="error"></p>
                    </form>
                </div>
            </div>
        </div>
    )

}
