import React, { Component, useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Navigation from './navbar';

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import './editAd.css';
import add from './add.png'
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
import Card from '../share/card';
import { getTags, upload, getAdById, getVideoImage } from '../../services/services';
import moment from 'jalali-moment'
moment.locale('fa')



const EditAd = () => {
    let { adId } = useParams();

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });
    const [tagList, setTagList] = useState([])
    const [selectedTag, setSelectedTag] = useState(1)
    const [name, setName] = useState("testt")
    const [companyId, setcompanyId] = useState("1")
    const [tagId, setTagId] = useState("1")
    const [description, setDescription] = useState("1")
    const [file, setFile] = useState()
    const [imageObj, setImageObg] = useState()
    const [listItems, setListItem] = useState([
        {
            name: 'آیتم 1', id: 1
        },
        {
            name: 'آیتم 2', id: 2
        }
    ]);

    useEffect(() => {
        getAdById(adId).then(data => {
            setName(data.name)
            setSelectedDayRange({
                from: {day: moment(data.schedule[0]).day(), month: moment(data.schedule[0]).month(), year: moment(data.schedule[0]).year()},
                to: {day: moment(data.schedule[1]).day(), month: moment(data.schedule[1]).month(), year: moment(data.schedule[1]).year()}
            })
            setDescription(data.description)
            console.log(moment(data.schedule[0]).month())
        })

        getVideoImage(adId, function(dataUrl) {
            console.log('RESULT:', dataUrl)
            setImageObg(dataUrl)
          })
        //   .then(image => {
        //     setImageObg(image)
        // })

        getTags().then(tags => setTagList(tags))
        console.log(tagList)
    }, []);

    const renderCustomInput = ({ ref }) => (
        <input
            readOnly
            ref={ref} // necessary
            placeholder=""
            value={selectedDayRange.from == null || selectedDayRange.to == null ? '' : `از ${selectedDayRange.from.day} / ${selectedDayRange.from.month} / ${selectedDayRange.from.year} تا ${selectedDayRange.to.day} / ${selectedDayRange.to.month} / ${selectedDayRange.to.year}`}
            className="form-control" // a styling class
        />
    )

    var fileInput = useRef(null);

    const wrapper = { border: '1px solid gray', borderRadius: '5px', padding: '44px', marginTop: '5%' }

    const triggerInputFile = () => {
        ///console.log(fileInput)
        var file = fileInput.click();
    }

    const sumbitForm = () => {
        var from = moment(selectedDayRange.from.year + "/" + selectedDayRange.from.month + '/' + selectedDayRange.from.day).unix()
        var to = moment(selectedDayRange.to.year + "/" + selectedDayRange.to.month + '/' + selectedDayRange.to.day).unix()
        console.log(selectedDayRange.from)
        upload({
            file: file,
            name: name,
            company_id: companyId,
            tag_ids: selectedTag,
            enabled: true,
            schedule: [from, to]
        })
    }

    const onChange = (e) => {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value)
                break;
            case 'tag':
                setSelectedTag(e.target.value)
                break;
            case 'company':
                setcompanyId(e.target.value)
                break;
            case 'file':
                setFile(e.target.files[0])
                break;
            default:
                break;
        }
    }

    const submitTest = () => {
        console.log(selectedDayRange)


        var myHeaders = new Headers();

        var formdata = new FormData();
        formdata.append("video", file);
        formdata.append("name", "test_video");
        formdata.append("company_id", "1");
        formdata.append("tag_ids", "[1,2]");
        formdata.append("enabled", "true");
        formdata.append("schedule", "[1592808138, 1592809138]");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        // fetch("http://avir.sytes.net:7000/ad", requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
    }

    return (
        <Container style={{ direction: 'rtl' }}>
            <Navigation />

            <div className="pannel-wrapper">
                <Row style={{ textAlign: 'center', marginTop: '50px' }}>
                    <Col className="right-col" md={6}>
                        <div className="form-row">
                            <div class="form-group col-md-12">
                                <label>نام</label>
                                <input value={name} onChange={onChange} name="name" type="text" className="form-control" placeholder="نام" />
                            </div>
                        </div>
                        <div className="form-group" style={{ direction: 'ltr', textAlign: 'center' }}>
                            <label>بازه ردیابی</label>
                            <DatePicker
                                value={selectedDayRange}
                                onChange={setSelectedDayRange}
                                inputPlaceholder="Select a day range"
                                shouldHighlightWeekends
                                renderInput={renderCustomInput} // render a custom input
                                locale="fa"
                            />
                        </div>
                        <div className="form-group">
                            <label>دسنه</label>
                            <select type="text" className="form-control" name="tag" placeholder="نام"  onChange={onChange}>
                                {tagList.map(m => <option value={m.id}> {m.name} </option>)}
                            </select>
                        </div>
                    </Col>
                    <Col style={{ textAlign: 'center' }} md={6}>

                        <div class="form-group col-md-12" onClick={triggerInputFile}>
                            <Card>
                                <img src={imageObj} alt="plx1" />
                                <input type="file" name="file" ref={input => fileInput = input} onChange={onChange}/>
                            </Card>                            
                        </div>

                        <div class="form-group" style={{ marginTop: '30px' }}>
                            <label>توضیحات</label>
                            <textarea className="form-control" name="description" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </Col>
                </Row>
                <Row style={{ textAlign: 'center', marginTop: '65px' }}>
                    <Col>
                        {/* <Link className="btn btn-primary btn-block" to="/panel">ذخیره</Link> */}
                        <Button lassName="btn btn-primary btn-block" onClick={submitTest}>ذخیره</Button>
                    </Col>
                </Row>
            </div>

        </Container>
    )

}


export default EditAd;
