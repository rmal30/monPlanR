import React, { Component } from "react";
import { Icon, Menu, Popup, Grid } from "semantic-ui-react";

import MediaQuery from "react-responsive";

/**
* Creates a Popup for ImportantDates coming up
* @author Eric Jiang
*/
export default class ImportantDates extends Component {
    /**
    * Constructor
    */
    constructor(){
        super();
        this.state = {
            importantDates: [
                {
                    "date": "2017-02-20",
                    "name": "Orientation Week Begins"
                },
                {
                    "date": "2017-02-24",
                    "name": "Orientation Week Ends"
                },
                {
                    "date": "2017-02-27",
                    "name": "Semester 1 (S1-01) Begins"
                },
                {
                    "date": "2017-03-10",
                    "name": "Last day to add on-campus semester one (S1-01) or full-year (FY-01) units"
                },
                {
                    "date": "2017-03-31",
                    "name": "Census Date for Semester 1 (S1-01) - FINALISE your course"
                },
                {
                    "date": "2017-03-31",
                    "name": "Last day to discontinue semester one (S1-01) and full-year (FY-01) units without 'withdrawn' showing on academic record"
                },
                {
                    "date": "2017-04-14",
                    "name": "Mid-Semester (S1-01) Break Begins"
                },
            ]
        };
    }

    /**
    * Render method
    */
    render(){
        return (
            <Popup
                on="hover"
                hoverable
                wide
                trigger={(
                    <Menu.Item>
                        <Icon name="calendar" inverted/>&nbsp;
                        <MediaQuery minDeviceWidth={768}>
                            Important Dates
                        </MediaQuery>
                    </Menu.Item>
                )}>
                <Popup.Header>
                    Important Dates Coming Up
                </Popup.Header>
                <Popup.Content>
                    <br />
                    <div>
                        <Grid>
                        {
                                (this.state.importantDates).map(current => {
                                    var currentDate = new Date();
                                    var date = new Date(current.date);
                                    var endRange = new Date();
                                    Date.daysBetween = function( date1, date2 ) {
                                        //Get 1 day in milliseconds
                                        var one_day=1000*60*60*24;

                                        // Convert both dates to milliseconds
                                        var date1_ms = date1.getTime();
                                        var date2_ms = date2.getTime();

                                        // Calculate the difference in milliseconds
                                        var difference_ms = date2_ms - date1_ms;

                                        // Convert back to days and return
                                        return Math.round(difference_ms/one_day);
                                    };
                                    if(Date.daysBetween(currentDate, date) < 7) {
                                        var classNameString = "dayWarn";
                                    }
                                    endRange.setMonth(currentDate.getMonth()+2);
                                    if(date > currentDate && date < endRange){
                                        var dateStr = (date.getDate().toString() + "/" + (date.getMonth()+1).toString() + "/" + date.getFullYear().toString());
                                        return (<Grid.Row className={classNameString} >
                                                    <Grid.Column width={8}>{dateStr}</Grid.Column>
                                                    <Grid.Column width={8}>{current.name}</Grid.Column>
                                                </Grid.Row>);
                                    }
                                })
                        };
                    </Grid>
                    </div>
                </Popup.Content>
            </Popup>
        );
    }
}
