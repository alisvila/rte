import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";
import nomatch from './broken.png'

export default function NoMatch() {
  let location = useLocation();

  return (
    <div className="container">
      <div className="row">
        <div className="login-wrapper">
          <form className="form-signin" style={{ textAlign: 'center' }}>
            <img className="mb-4 logo" style={{ width: "75px" }} src={nomatch} alt="" />
            <p style={{ textAlign: 'center' }}>404 page not found</p>
            <div className="checkbox mb-3">

            </div>
            <Link to="/panel" className="btn btn-block btn-primary">Home</Link>

            {/* <button className="btn btn-lg btn-block btn-finno">Home</button> */}
            <p className="error" id="error"></p>
          </form>
        </div>
      </div>
    </div>
  )
}