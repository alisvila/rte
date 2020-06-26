import React, { Component } from 'react';
import { Container, Row, Col, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Navigation from './navbar';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePickerWrapper, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import * as moment from 'jalali-moment';
import './newAd.css';



export default class index extends Component {
    m = moment('1989/1/24', 'YYYY/M/D');
    state = {
        listItems : [
            {
                name: 'آیتم 1', id: 1
            },
            {
                name: 'آیتم 2', id: 2
            }]
    }
    

    render() {
        return (
            <Container>
                <Navigation />
                <Row>
                    <div className="col-md-10 offset-md-1" style={{
                        border: '1px',
                        height: '300px',
                        direction: 'rtl'
                    }}>
                        <div>
                            <Row>
                                <div className="col-md-5" style={{
                                    direction: "rtl"
                                }}>
                                    <div><h5>ویرایش / ایجاد تبلیغ</h5></div>
                                    <div>
                                        <lable>نام</lable>
                                        <input type="text" class="form-control mb-2 mr-sm-2" placeholder="نام" />
                                    </div>

                                    <div>
                                        <lable>بازه ردیابی</lable>
                                        
                                        <SingleDatePicker
                                            isRTL
                                            stateDateWrapper={this.jMoment}
                                            startDatePlaceholderText="تاریخ شروع"
                                            endDatePlaceholderText="تاریخ پایان"
                                            // renderMonthText={renderMonthText}
                                            // renderDayContents={renderDayContents}
                                        />                              

                                        <select type="text" class="form-control mb-2 mr-sm-2" placeholder="نام" >
                                            {this.state.listItems.map(m => <option value={m.id}> {m.name} </option>)}
                                        </select>
                                    </div>

                                </div>
                                <div className="col-md-7 ">
                                    <div className="uploader">

                                    </div>
                                    <div className="description">
                                        <lable style={{ display: 'block', textAlign: "right" }}>توضیحات</lable>
                                        <textarea style={{ width: '100%' }}>

                                        </textarea>
                                    </div>
                                </div>
                            </Row>
                        </div>
                    </div>
                </Row>


            </Container>
        )
    }

}
