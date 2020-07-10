import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Form, FormControl, Dropdown } from 'react-bootstrap';
import { getTags } from '../../services/services';


export default function Search(props) {
    const [search, setSearch] = useState()
    const [btnText, setBtntext] = useState("نام دسته")
    const [tagList, setTagList] = useState([])

    useEffect(() => {
        getTags().then(tags => setTagList(tags))
    }, []);

    var list
    const onChange = (e) => {
        let value = e.target.value
        setSearch(value)
        list = props.list.filter(item => {
            let ret = item.name.includes(value) ? true : false
            return ret
        })
        if (value === "") {
            list = props.list
        }
        props.searched(list)
    }

    const onclick = (e) => {
        let text = e.target.textContent
        setBtntext(text)
        list = props.list.filter(item => {
            for(let i=0; i < item.tags.length; i++) {
                if (item.tags[i].name === text) {
                    return true
                }
            }
        })
        if (text === "همه") {
            list = props.list
        }
        props.searched(list)
    }
    return (
        <div className="d-flex justify-content-center" style={{ marginTop: '5%', direction: 'rtl' }}>
            <Form inline>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {btnText}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={onclick}>همه</Dropdown.Item>
                        {tagList.map(item => {
                            console.log(item)
                            return(
                                <Dropdown.Item onClick={onclick}>{item.name}</Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                {/* <Button className="btn-secondary">جستجو</Button> */}
                <FormControl value={search} type="text" placeholder="جستجو" className="mr-sm-2" onChange={onChange} />
            </Form>
        </div>
    )
}
