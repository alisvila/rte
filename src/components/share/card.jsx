import React from 'react'

export default function Card(props) {
    return (
        <div className="d-flex card wrapper card-" onClick={props.onClick} style={props.style} name={props.name}>
            <div className="client panel panel-default text-center approved" data="ffilan" status="approved" name={props.name}>
                {/* <div className="panel-heading">
                    <h6>asd</h6>
                </div> */}
                {/* <div className="logo approved"></div> */}
                <div className="" name={props.name}>{props.children}</div>
                {/* <div className="approved-icone">
                    <i className="fa fa-trash-o"></i>
                </div> */}
            </div>
        </div>
    )
}
