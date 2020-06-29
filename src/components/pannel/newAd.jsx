import React, { Component } from 'react';
import { Container, Row, Col, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Navigation from './navbar';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import * as moment from 'jalali-moment';
import './newAd.css';
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
import Card from '../share/card'


export default class index extends Component {
    constructor() {
        super()
        this.state = {
            focusedInput: null,
            startDate: moment.locale('fa'),
            endDate: moment().add(7, 'days'),
            fullscreen: false,
            // direction: 'left',
            dateFormat: 'jMM/DD/YYYY',
            small: false,
            block: false,
            orientation: 'horizontal',
            numMonths: 2,
            minimumNights: 7,
            listItems: [
                {
                    name: 'آیتم 1', id: 1
                },
                {
                    name: 'آیتم 2', id: 2
                }]
        }
        this.handleDatesChange = this.handleDatesChange.bind(this)
        this.handleFocusChange = this.handleFocusChange.bind(this)
        this.handleIsDayBlocked = this.handleIsDayBlocked.bind(this)
    }

    componentDidMount() {
    }

    BLOCKED_DATES = [
        moment().add(10, 'days'),
        moment().add(11, 'days'),
        moment().add(12, 'days'),
    ];

    handleDatesChange({ startDate, endDate }) {
        this.setState({ startDate, endDate });
    }

    handleFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    handleIsDayBlocked(day) {
        return this.BLOCKED_DATES.filter(d => d.isSame(day, 'day')).length > 0;
    }

    submitAd() {
        var bodyFormData = new FormData();

    }

    render() {
        const wrapper = { border: '1px solid gray', borderRadius: '5px', padding: '44px', marginTop: '5%' }
        return (
            <Container style={{ direction: 'rtl' }}>
                <Navigation />

                <div className="pannel-wrapper">
                    <Row style={{ textAlign: 'center', marginTop: '50px' }}>
                        <Col className="right-col" md={6}>
                            <div className="form-row">
                                <div class="form-group col-md-12">
                                    <label>نام</label>
                                    <input type="text" className="form-control" placeholder="نام" />
                                </div>
                            </div>
                            <div className="form-group" style={{ direction: 'ltr', textAlign: 'center' }}>
                                <label>بازه ردیابی</label>
                                <DateRangePicker
                                    stateDateWrapper={moment.locale('fa')}
                                    date={moment.locale('fa')}
                                    isRTL
                                    // showDefaultInputIcon
                                    showClearDates
                                    startDatePlaceholderText="تاریخ شروع"
                                    endDatePlaceholderText="تاریخ پایان"
                                    // startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                    // startDateId="unique_start_date_id" // PropTypes.string.isRequired,
                                    // endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                    // endDateId="unique_end_date_id" // PropTypes.string.isRequired,
                                    onDatesChange={this.handleDatesChange} // PropTypes.func.isRequired,
                                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                    onFocusChange={this.handleFocusChange} // PropTypes.func.isRequired,
                                    displayFormat="jYYYY/jMM/jDD"
                                    // hideKeyboardShortcutsPanel={true}
                                    // numberOfMonths={2}
                                    block={true}
                                    // // small={this.state.small}
                                    // // withFullScreenPortal={this.state.fullscreen}
                                    anchorDirection="right"
                                // orientation="horizontal"
                                // minimumNights={this.state.minimumNights}
                                // isDayBlocked={this.handleIsDayBlocked}
                                />
                            </div>
                            <div className="form-group">
                                <label>دسنه</label>
                                <select type="text" className="form-control" placeholder="نام" >
                                    {this.state.listItems.map(m => <option value={m.id}> {m.name} </option>)}
                                </select>
                            </div>
                        </Col>
                        <Col style={{ textAlign: 'center' }} md={6}>

                            <div class="form-group col-md-12">
                                <Card>
                                    <img src={add} alt="plx1" />
                                </Card>                            </div>

                            <div class="form-group" style={{ marginTop: '30px' }}>
                                <label>توضیحات</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center', marginTop: '65px' }}>
                        <Col>
                            <Link className="btn btn-primary btn-block" to="/panel">ذخیره</Link>
                        </Col>
                    </Row>
                </div>

            </Container>
        )
    }

}
