import React from 'react'

export default function Card(props) {
    return (
        <div class="d-flex card wrapper">
            <div class="client panel panel-default text-center approved" data="ffilan" status="approved">
                <div class="panel-heading">
                    <h6>asd</h6>
                </div>
                <div class="logo approved"></div>
                <div className="card-body">{props.children}</div>
                <div class="approved-icone">
                    <i class="fa fa-trash-o"></i>

                </div>
            </div>
        </div>
    )
}
