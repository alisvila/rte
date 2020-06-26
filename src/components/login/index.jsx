import React, {  useState } from 'react'
import { withRouter } from 'react-router-dom';

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
    const history = useHistory();


    const routeChange = () => {
        let path = `panel/newad`;
        history.push(path);
    }

    const login = () => {
        let path = `panel/`;
        history.push(path);
        // agent.Auth.login(this.state.username, this.state.password, this.loginSuccess);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="login-wrapper">
                    <form className="form-signin">
                        <img className="mb-4 logo" src={avir} alt="" />
                        <label for="inputEmail" className="sr-only">آدرس ایمیل</label>
                        <input type="text"
                            name="username"
                            id="inputEmail"
                            className="form-control"
                            placeholder="آدرس ایمیل"
                            required
                            autofocus
                        />
                        <label for="inputPassword" className="sr-only">روز عبور</label>
                        <input type="password"
                            name="password"
                            id="inputPassword"
                            className="form-control"
                            placeholder="رمز عبور"
                            required
                        />
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" />مرا به خاطر بسپار
                                </label>
                        </div>
                        <button className="btn btn-lg btn-block btn-finno" onClick={login}>ورود</button>
                        <p className="error" id="error"></p>
                    </form>
                </div>
            </div>
        </div>
    )

}
