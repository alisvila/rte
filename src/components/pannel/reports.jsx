import React, { Component, useState, useEffect } from 'react';
import { Container, Row, Col, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Navigation from './navbar';
import './newAd.css';
import plc1 from './plc1.jpg';
import { Chart } from "react-google-charts";
import DatePicker from "react-modern-calendar-datepicker";
import * as moment from 'jalali-moment';

const Reports = () => {

    useEffect(() => {
        console.log(moment().format('MM'))
    }, []);

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
      });

     const [listItems, setListItem] = useState([
            {
                name: 'آیتم 1', id: 1
            },
            {
                name: 'آیتم 2', id: 2
            }
     ]);

     const renderCustomInput = ({ ref }) => (
        <input
          readOnly
          ref={ref} // necessary
          placeholder=""
          value={ selectedDayRange.from == null || selectedDayRange.to == null ? '' : `از ${ selectedDayRange.from.day } / ${selectedDayRange.from.month} / ${selectedDayRange.from.year} تا ${ selectedDayRange.to.day } / ${selectedDayRange.to.month} / ${selectedDayRange.to.year}` }
          className="form-control" // a styling class
        />
      )

      const changeDate = (strDate) =>{
          const dateObje = new Date(strDate);
          return moment(dateObje, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
      }

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
                            <DatePicker
                                value={selectedDayRange}
                                onChange={setSelectedDayRange}
                                inputPlaceholder="Select a day range"
                                shouldHighlightWeekends
                                renderInput={renderCustomInput} // render a custom input
                                locale="fa"
                            />
                            </div>
                            <div className="form-group col-md-4">
                                <label>شبکه</label>
                                <select type="text" className="form-control" placeholder="نام" >
                                    {listItems.map(m => <option value={m.id}> {m.name} </option>)}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                        <Chart
                                width={'100%'}
                                height={'500px'}
                                chartType="Timeline"
                                loader={<div>در حال بارگزاری</div>}
                                options = {{
                                    title: 'Rate the Day on a Scale of 1 to 10',
                                    hAxis: {
                                      gridlines: {
                                        count: -1,
                                        units: {
                                        days: {format: ['MMM dd']},
                                        hours: {format: ['HH:mm', 'ha']},
                                        }
                                    }
                                    },
                                    vAxis: {
                                      gridlines: {color: 'none'},
                                      minValue: 0
                                    }
                                }}
                                data={[
                                    [
                                    { type: 'string', id: 'Term' },
                                    { type: 'string', id: 'Name' },
                                    { type: 'string', role: 'tooltip' },
                                    { type: 'date', id: 'Start' },
                                    { type: 'date', id: 'End' },
                                    ],
                                    [ '1', 'گلرنگ', 'این انقد ', new Date(selectedDayRange.from), new Date(selectedDayRange.to) ],
                                  
                                ]}
                                rootProps={{ 'data-testid': '2' }}
                                />
                        </div>
                    </Col>
                </Row>
            </div>


        </Container>
    )



}

export default Reports;

// export default class Reports extends Component {
//     constructor() {
//         super()
//         this.state = {
//             selectedDayRange:{
//                 from: null,
//                 to: null
//               },
//             listItems: [
//                 {
//                     name: 'آیتم 1', id: 1
//                 },
//                 {
//                     name: 'آیتم 2', id: 2
//                 }]
//         }
//     }
//     render() {
//         const wrapper = { border: '1px solid gray', borderRadius: '5px', padding: '44px', marginTop: '5%' }
//         return (
//             <Container style={{ direction: 'rtl' }}>
//                 <Navigation />
//                 <div className="pannel-wrapper">

//                     <Row style={{textAlign: 'center'}}>
//                         <Col>
//                             <div className="form-row">
//                                 <div class="form-group col-md-4">
//                                     <label>نام لاتین</label>
//                                     <input type="text" className="form-control" placeholder="نام" />
//                                 </div>

//                                 <div className="form-group col-md-4" style={{ direction: 'ltr', textAlign: 'center' }}>
//                                 <label>بازه زمانی</label>
//                                 <DatePicker
//                                     value={this.selectedDayRange}
//                                     onChange={this.setState}
//                                     inputPlaceholder="Select a day range"
//                                     shouldHighlightWeekends
//                                     renderInput={renderCustomInput} // render a custom input
//                                     locale="fa"
//                                     />
//                                 </div>
//                                 <div className="form-group col-md-4">
//                                     <label>شبکه</label>
//                                     <select type="text" className="form-control" placeholder="نام" >
//                                         {this.state.listItems.map(m => <option value={m.id}> {m.name} </option>)}
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="row">
//                             <Chart
//                                     width={'100%'}
//                                     height={'500px'}
//                                     chartType="Timeline"
//                                     loader={<div>در حال بارگزاری</div>}
                                    
//                                     data={[
//                                         [
//                                         { type: 'string', id: 'Term' },
//                                         { type: 'string', id: 'Name' },
//                                         { type: 'date', id: 'Start' },
//                                         { type: 'date', id: 'End' },
//                                         ],
//                                         ['1', 'گلرنگ', new Date(2020, 3, 30,0,5,10,0), new Date(2020, 3, 30,0,5,20,0)],
//                                         ['1', 'گلرنگ', new Date(2020, 3, 30,0,7,12,0), new Date(2020, 3, 30,0,7,25,0)],
//                                         ['1', 'گلرنگ', new Date(2020, 3, 31,0,7,12,0), new Date(2020, 3, 31,0,7,25,0)]
//                                     ]}
//                                     rootProps={{ 'data-testid': '2' }}
//                                     />
//                             </div>
//                         </Col>
//                     </Row>
//                 </div>


//             </Container>
//         )
//     }

// }
