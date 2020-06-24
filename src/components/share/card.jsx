import React from 'react'

export default function Card(props) {
    return (
        <div className="d-flex card wrapper" onClick={props.onClick}>
            <div className="client panel panel-default text-center approved" data="ffilan" status="approved">
                <div className="panel-heading">
                    <h6>asd</h6>
                </div>
                <div className="logo approved"></div>
                <div className="card-body">{props.children}</div>
                <div className="approved-icone">
                    <i className="fa fa-trash-o"></i>
                </div>
            </div>
        </div>
    )
}
