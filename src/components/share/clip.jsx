import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './clip.css'

export default function Clip(props) {
    let {id, index} = props
    return (
        <span className="tag badge badge-pill badge-primary">
            <span>{props.children}</span>
            <a onClick={() => props.click(id, index)}><FontAwesomeIcon icon={faTimes} /></a>
        </span>
    )
}
