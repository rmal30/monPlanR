import React, { PropTypes } from "react";
import { Divider, Grid, Statistic, Icon } from "semantic-ui-react";
import CourseDescription from "./CourseDescription.jsx";
/**
 * @author JXNS
 * A simple component that renders course info details, check the proptypes check for full data available
 */
export default function CourseInfo(props){
    return (
        <Grid stackable celled="internally" columns={2}>
            <Grid.Row>
                <Grid.Column width={12}>
                    <h3>{props.courseCode + " - " + props.courseName} </h3>
                    <i>{props.abrTitle}</i>
                    <p><b>Managing faculty:</b>  {props.faculty}</p>
                </Grid.Column>

                <Grid.Column width={4}>
                    <Statistic size="mini">
                        <Statistic.Value>
                            <Icon name='student' />
                            {props.creditPoints}
                        </Statistic.Value>
                        <Statistic.Label>Required Credit Points</Statistic.Label>
                    </Statistic>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={12}>
                    <Grid.Row>
                        <CourseDescription description={props.courseDescription} />
                    </Grid.Row>
                </Grid.Column>

                <Grid.Column width={4}>
                    <Icon name="time" />
                    <b>Duration of Course: </b>
                    <p><i>{props.durationStr}</i></p>
                    <Divider />
                    <Icon name="pin" />
                    <b>Mode and location:</b>
                    <p><i>{props.modeAndLocation}</i></p>
                    <Divider />
                    <Icon name="student" />
                    <b>Awards: </b>
                    <p><i>{props.awards.length !== 0 ? props.awards : "No Awards Available"}</i></p>
                    <Divider />
                    <a target="blank" href={`https://www.monash.edu.au/pubs/handbooks/courses/${props.courseCode}.html`}>{"View " + props.courseCode + " handbook entry"}</a>
                    <Divider />
                    <a target="blank" href={`https://www.study.monash/courses/find-a-course/2017/${props.courseCode}`}>{"View study.monash entry for " +  props.courseCode}</a>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

CourseInfo.propTypes = {
    courseCode: PropTypes.string,
    courseName: PropTypes.string,
    faculty: PropTypes.string,
    creditPoints: PropTypes.number,
    courseDescription: PropTypes.string,
    durationStr: PropTypes.string,
    modeAndLocation: PropTypes.string,
    awards: PropTypes.string,
    abrTitle: PropTypes.string
};
