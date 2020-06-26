import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
    useParams
} from "react-router-dom";

export default function EditAd() {

    let { adId } = useParams();
    const [list, setList] = useState([]);
    const history = useHistory();

    const routeChange = () => {
        let path = `panel`;
        history.push(path);
    }

    useEffect(() => {
        console.log(adId)
    });

    return (
        <div>
            id is: {adId}
        </div>
    )
}
