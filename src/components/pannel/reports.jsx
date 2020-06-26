import React, { Component } from 'react';
import { Container, Row, Col, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Navigation from './navbar';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import * as moment from 'jalali-moment';
import './newAd.css';
import plc1 from './plc1.jpg'



export default class Reports extends Component {
    constructor() {
        super()
        this.state = {
            focusedInput: null,
            startDate: moment(),
            endDate: moment().add(7, 'days'),
            fullscreen: false,
            direction: 'left',
            dateFormat: 'MM/DD/YYYY',
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

    render() {
        const wrapper = { border: '1px solid gray', borderRadius: '5px', padding: '44px', marginTop: '5%' }
        return (
            <Container style={{ direction: 'rtl' }}>
                <Navigation />
                <div className="pannel-wrapper">

                    <Row style={{textAlign: 'center'}}>
                        <Col>
                            <div className="form-row">
                                <div class="form-group col-md-4">
                                    <label>نام لاتین</label>
                                    <input type="text" className="form-control" placeholder="نام" />
                                </div>

                                <div className="form-group col-md-4" style={{ direction: 'ltr', textAlign: 'center' }}>
                                <label>بازه زمانی</label>
                                    <DateRangePicker
                                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                        startDateId="unique_start_date_id" // PropTypes.string.isRequired,
                                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                        endDateId="unique_end_date_id" // PropTypes.string.isRequired,
                                        onDatesChange={this.handleDatesChange} // PropTypes.func.isRequired,
                                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                        onFocusChange={this.handleFocusChange} // PropTypes.func.isRequired,
                                        displayFormat="MM/DD/YYYY"
                                        hideKeyboardShortcutsPanel={true}
                                        numberOfMonths={2}
                                        block={true}
                                        small={true}
                                        // withFullScreenPortal={this.state.fullscreen}
                                        anchorDirection="right"
                                        orientation="horizontal"
                                        // minimumNights={this.state.minimumNights}
                                        isDayBlocked={this.handleIsDayBlocked}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>شبکه</label>
                                    <select type="text" className="form-control" placeholder="نام" >
                                        {this.state.listItems.map(m => <option value={m.id}> {m.name} </option>)}
                                    </select>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>


            </Container>
        )
    }

}
