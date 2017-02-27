import React, { PropTypes } from "react";
import { Divider, Icon, Menu, Popup, Card, Feed, Breadcrumb } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import moment from "moment";

/**
* Creates a Popup for ImportantDates coming up
* @author Eric Jiang, JXNS, Saurabh Joshi
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
                            Important dates
                        </MediaQuery>
                    </Menu.Item>
                )}>
                <Popup.Header>
                        <Icon name="calendar" />
                        Important dates coming up
                </Popup.Header>
                <Popup.Content>
                    Today is {moment().format("DD MMMM, YYYY")}.
                    <br />
                        <Card>
                            <div style={{overflowY: "auto", maxHeight: "500px"}}>
                                <Card.Content>
                                    <Feed>
                                    {
                                        (props.importantDates).map((current, index) => {
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
                                            const dayDelta = Date.daysBetween(currentDate, date);
                                            if(dayDelta < 7) {
                                                var classNameString = "dayWarn";
                                            }
                                            endRange.setDate(currentDate.getDate()+15);
                                            if(date > currentDate && date < endRange) {
                                                return (
                                                    <Feed.Event key={index} className={classNameString} >
                                                        <Feed.Content>
                                                            <Feed.Summary>
                                                                {current.date}
                                                                <Feed.Date>{dayDelta} days from now</Feed.Date>
                                                            </Feed.Summary>
                                                            <Feed.Extra text>
                                                                {current.description}
                                                            </Feed.Extra>
                                                            <Divider fitted />
                                                        </Feed.Content>
                                                    </Feed.Event>
                                                );
                                            }
                                        })
                                    }
                                    </Feed>
                                </Card.Content>
                            </div>
                            <Card.Content extra>
                                <Breadcrumb>
                                    <Breadcrumb.Section href="https://my.monash.edu.au/wes/">
                                       WES
                                   </Breadcrumb.Section>
                                    <Breadcrumb.Divider />
                                    <Breadcrumb.Section href="https://my.monash">my.monash</Breadcrumb.Section>
                                    <Breadcrumb.Divider />
                                    <Breadcrumb.Section href="https://www.monash.edu/timetables">Timetabling</Breadcrumb.Section>
                                 </Breadcrumb>
                            </Card.Content>
                        </Card>
                </Popup.Content>
            </Popup>
    );
};

/**
* Map to State
*/
const mapStateToProps = (state) => {
    return {
        importantDates: state.ImportantDates.importantDates
    };
};

ImportantDates.propTypes = {
    importantDates: PropTypes.array
};

export default connect(mapStateToProps)(ImportantDates);
