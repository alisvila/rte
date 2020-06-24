import React from 'react'
import { Navbar } from 'react-bootstrap';

export default function index() {
    return (
        <Navbar bg="light" expand="lg">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>
            <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-left">
                    <li><a href="#">Left</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-center">
                    <li><a href="#">Center 1</a></li>
                    <li><a href="#">Center 2</a></li>
                    <li><a href="#">Center 3</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Right</a></li>
                </ul>
            </div>
        </Navbar>
    )
}
