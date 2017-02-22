import React, { PropTypes } from "react";
import { Icon, Menu, Popup, Grid } from "semantic-ui-react";

import MediaQuery from "react-responsive";

import { connect } from "react-redux";

/**
* Creates a Popup for ImportantDates coming up
* @author Eric Jiang, JXNS
*/
const ImportantDates = (props) => {
    /**
    * Return function
    */
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
                    <div style={{overflowY: "scroll", maxHeight: "500px"}}>
                        <Grid>
                            {
                                (props.importantDates).map(current => {
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
                                    endRange.setDate(currentDate.getDate()+15);
                                    if(date > currentDate && date < endRange){
                                        var dateStr = (date.getDate().toString() + "/" + (date.getMonth()+1).toString() + "/" + date.getFullYear().toString());
                                        return (<Grid.Row className={classNameString} >
                                            <Grid.Column width={8}>{dateStr}</Grid.Column>
                                            <Grid.Column width={8}>{current.description}</Grid.Column>
                                        </Grid.Row>);
                                    }
                                })
                            }
                        </Grid>
                    </div>
                </Popup.Content>
            </Popup>
    );
};

/**
* Map to State
*/
const mapStateToProps = (state) => {
    return {
        importantDates: state.CourseStructure.importantDates
    };
};

ImportantDates.propTypes = {
    importantDates: PropTypes.array
};

export default connect(mapStateToProps)(ImportantDates);
