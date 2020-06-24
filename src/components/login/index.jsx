import React, { Component } from 'react'
// import agent from '../service/api'

export default class login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        this.setState({ [target.name]: target.value })
    }

    loginSuccess = () => {
        this.props.history.push('/pannel')
    }

    login = () => {
        console.log('aa')
        // agent.Auth.login(this.state.username, this.state.password, this.loginSuccess);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="login-wrapper">
                        <form className="form-signin">
                            <img className="mb-4 logo" src="https://sabinarya.com/wp-content/uploads/2019/04/Sabin_Tejarat-Aria-Vsmall.png" alt="" />
                            <label for="inputEmail" className="sr-only">آدرس ایمیل</label>
                            <input type="text"
                                name="username"
                                id="inputEmail"
                                className="form-control"
                                value={this.state.username}
                                onChange={this.handleChange}
                                placeholder="آدرس ایمیل"
                                required
                                autofocus
                            />
                            <label for="inputPassword" className="sr-only">روز عبور</label>
                            <input type="password"
                                name="password"
                                id="inputPassword"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="رمز عبور"
                                required
                            />
                            <div className="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value="remember-me" />مرا به خاطر بسپار
                                </label>
                            </div>
                            <button className="btn btn-lg btn-block btn-finno" onClick={this.login}>ورود</button>
                            <p className="error" id="error"></p>
                        </form>
                    </div>
                </div>

                <div className="power">
                    <span>with <img alt ="" className="heart" src="https://static.djangoproject.com/img/small-fundraising-heart.d255f6e934e5.png" /> by </span>
                    <img alt="" src="http://filan.sabinarya.com/images/favicon.jpeg" />
                </div>
            </div>
        )
    }
}
