import React, { Component, useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import moment from 'jalali-moment'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import Navigation from './navbar';
import './newAd.css';
import add from './add.png'
import remove from './remove.png'
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
import Clip from '../share/clip';
import AlertBox from '../share/alert';
import { getTags, upload } from '../../services/services';
moment.locale('fa')


export default function NewAd() {
    let { adId } = useParams();

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: { day: moment().day(), month: moment().month(), year: moment().year() },
        to: { day: moment().add(1, 'days').day(), month: moment().add(1, 'days').month(), year: moment().add(1, 'days').year() }
    });
    const [tagList, setTagList] = useState([])
    const [selectedTag, setSelectedTag] = useState([])
    const [name, setName] = useState("")
    const [companyId, setcompanyId] = useState("1")
    const [file, setFile] = useState()
    const [listItems, setListItem] = useState();
    const [alertShow, setalertShow] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertVariant, setAlertVariant] = useState("danger")


    useEffect(() => {

        if (typeof adId !== undefined) {
            // for edit video
        }
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
        let value = e.target.value
        switch (e.target.name) {
            case 'name':
                setName(value)
                break;
            case 'tag':
                const found = selectedTag.find(element => element === value);
                if (!found) {
                    setSelectedTag(oldArray => [...oldArray, value])
                }
                break;
            case 'company':
                setcompanyId(value)
                break;
            case 'file':
                setFile(e.target.files[0])
                break;
            default:
                break;
        }
    }

    const render = () => {
        console.log('rendre', alertShow, alertMessage)
    }
    const submitTest = () => {
        console.log(file)
        setalertShow(true)

        if (!selectedDayRange.from || !selectedDayRange.to || !name || !file) {
            setalertShow(true)
            setAlertMessage('لطفا فیلدهای اجباری را پر کتید')
            console.log(alertShow, alertMessage)

            return
        }
        var from = moment(selectedDayRange.from.year + "/" + selectedDayRange.from.month + '/' + selectedDayRange.from.day).unix()
        var to = moment(selectedDayRange.to.year + "/" + selectedDayRange.to.month + '/' + selectedDayRange.to.day).unix()

        var myHeaders = new Headers();
        const auth = `Bearer  ${localStorage.getItem('token')}`
        myHeaders.append('Authorization', auth)

        var formdata = new FormData();
        formdata.append("video", file);
        formdata.append("name", name);
        formdata.append("company_id", companyId);
        formdata.append("tag_ids", JSON.stringify(selectedTag));
        formdata.append("enabled", "true");
        formdata.append('schedule', JSON.stringify([from, to]));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://avir.sytes.net:7000/ad", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => {
                setalertShow(true)
                setAlertMessage(error)
            })
    }

    const removeTag = (id, index) => {
        console.log(index, selectedTag, selectedTag.slice(0, 1))
        setSelectedTag(selectedTag.splice(index, 1));
    }

    const checkerror = (fieldname) => {
        let error = 'error-field'
        if (alertShow) {
            switch (fieldname) {
                case 'date':
                    if (!selectedDayRange.from || !selectedDayRange.to) return error
                    break;
                case 'name':
                    if (name === "") return error
                    break;
                case 'file':
                    if (!file) return error
                    break;

                default:
                    break;
            }

        }
    }

    return (
        <Container style={{ direction: 'rtl' }}>
            <Navigation />
            {render()}

            <div className="pannel-wrapper">
                <Row style={{ textAlign: 'center', marginTop: '50px' }}>
                    <Col className="right-col" md={6}>
                        <div className="form-row">
                            <div class="form-group col-md-12">
                                <label>نام</label>
                                <div className={checkerror('name')}>
                                    <input value={name} onChange={onChange} name="name" type="text" className="form-control" placeholder="نام" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group" style={{ direction: 'ltr', textAlign: 'center' }}>
                            <label>بازه ردیابی</label>
                            <div className={checkerror('date')}>

                                <DatePicker
                                    value={selectedDayRange}
                                    onChange={setSelectedDayRange}
                                    inputPlaceholder="Select a day range"
                                    shouldHighlightWeekends
                                    renderInput={renderCustomInput} // render a custom input
                                    locale="fa"
                                    className='error-field'
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>دسته</label>
                            <select type="text" className="form-control" name="tag" placeholder="نام" onChange={onChange}>
                                <option disabled selected> -- انتخاب دسته -- </option>
                                {tagList.map(m => <option value={m.id}> {m.name} </option>)}
                            </select>
                            {selectedTag.map((item, index) => {
                                let name
                                tagList.map(obj => {
                                    console.log(item, obj.id, selectedTag)
                                    if (obj.id === parseInt(item)) {
                                        name = obj.name
                                    }
                                })
                                return (
                                    <Clip click={removeTag} id={item.id} index={index}>
                                        {name}
                                    </Clip>
                                )
                            })}
                        </div>
                    </Col>
                    <Col style={{ textAlign: 'center' }} md={6}>

                        <div class="form-group col-md-12" onClick={triggerInputFile}>
                            <Card>
                                <div className={checkerror('file')}>
                                    {file ?
                                        <>
                                            <span style={{ position: 'relative', top: '69px'}}>
                                                {file.name}
                                            </span>
                                            {/* <img src={remove} alt="add new" /> */}
                                        <img src={add} alt="add new" style={{opacity: '0'}}/>

                                        </>
                                        :
                                        <img src={add} alt="add new" />
                                    }
                                    <input type="file" name="file" ref={input => fileInput = input} onChange={onChange} />
                                </div>
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
                <AlertBox variant={alertVariant} show={alertShow} setShow={setalertShow}>
                    {alertMessage}
                </AlertBox>

        </Container>
    )

}

