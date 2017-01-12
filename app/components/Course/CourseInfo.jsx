import React from 'react';
import { Divider, Grid, Statistic, Icon } from "semantic-ui-react";
import UnitDescriptionContainer from "../../containers/UnitDescriptionContainer.jsx";

export default function CourseInfo(props){
    let keyVal = 0;
    return (
    <Grid stackable celled="internally" columns={2}>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <h3>{props.courseCode + " - " + props.courseName}</h3>
                        <p>{"Managing faculty: " + props.faculty}</p>
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
                            <UnitDescriptionContainer
                                textLength={500}
                                fullText={props.description}
                            />
                            <Divider />
                            <b>Duration: </b>
                            <p>{props.durationStr}</p>
                            <Divider />
                            <b>Mode and location:</b>
                            <p>{props.modeAndLocation}</p>
                            <Divider />
                            <b>Awards: </b>
                            <ul>
                            {props.awards.map(item => {
                                return <li key={keyVal++}>{item}</li>
                            })}
                            </ul>
                         </Grid.Row>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <b>Abbreviated title:</b>
                        <p>{props.abrTitle}</p>
                        <Divider />
                        <a target="blank" href="#">{"View " + props.courseCode + " handbook entry"}</a>
                        <Divider />
                        <a target="blank" href="#">{"View study.monash entry for " +  props.courseCode}</a>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
}
