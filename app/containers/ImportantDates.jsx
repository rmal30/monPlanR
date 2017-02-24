import React, { PropTypes } from "react";
import { Icon, Menu, Popup, Card, Feed, Breadcrumb } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";

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
                    <br />

                        <Card>
                            <div style={{overflowY: "scroll", maxHeight: "500px"}}>
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
                                            if(Date.daysBetween(currentDate, date) < 7) {
                                                var classNameString = "dayWarn";
                                            }
                                            endRange.setDate(currentDate.getDate()+15);
                                            if(date > currentDate && date < endRange){
                                                var dateStr = (date.getDate().toString() + "/" + (date.getMonth()+1).toString() + "/" + date.getFullYear().toString());
                                                return (
                                                    <div>
                                                        <Feed.Event key={index} className={classNameString} >
                                                            <Feed.Content>
                                                                <Feed.Date content={dateStr} />
                                                                <Feed.Summary>
                                                                    {current.description}
                                                                </Feed.Summary>
                                                            </Feed.Content>
                                                        </Feed.Event>
                                                        <hr/>
                                                    </div>
                                                );
                                            }
                                        })
                                    }
                                    </Feed>
                                </Card.Content>
                            </div>
                            <Card.Content extra>
                                <Breadcrumb>
                                    <Breadcrumb.Section link as="a" href="https://my.monash.edu.au/wes/">
                                       WES
                                   </Breadcrumb.Section>
                                    <Breadcrumb.Divider />
                                    <Breadcrumb.Section link as="a" href="https://my.monash">my.monash</Breadcrumb.Section>
                                    <Breadcrumb.Divider />
                                    <Breadcrumb.Section link as="a" href="https://www.monash.edu/timetables">Timetabling</Breadcrumb.Section>
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
        importantDates: state.CourseStructure.importantDates
    };
};

ImportantDates.propTypes = {
    importantDates: PropTypes.array
};

export default connect(mapStateToProps)(ImportantDates);
