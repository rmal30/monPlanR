import React from 'react';
import { Divider, Grid, Statistic, Icon } from "semantic-ui-react";
import UnitDescriptionContainer from "../../containers/UnitDescriptionContainer.jsx";

export default function CourseInfo(props){
    return (
    <Grid stackable celled="internally" columns={2}>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <h3>{"E3003" + " - " + "Bachelor of Engineering (Honours) and Bachelor of Commerce Specialist"}</h3>
                        <p>{"Managing faculty: " + "Faculty of Engineering"}</p>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Statistic size="mini">
                            <Statistic.Value>
                                <Icon name='student' />
                                {"144"}
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
                                fullText={"Partner one of our specialist degrees in actuarial science, economics or finance with your choice from nine engineering specialisations to open up exciting career opportunities that may not be available to graduates in engineering or commerce alone. Perhaps after some years as an aeronautical engineer your future will be as a finance director for the major company designing the next generation of flight vehicles. Perhaps you will draw on strategic planning know how of actuarial science to contribute to the fortunes of a small start up. The possibilities are there - and yours for the making. Your blend of technical and analytical skills, along with an understanding of the business world, will give you a competitive edge in the job market. Career options include commerce, industry, government or private practice. You might work in in the aviation industry or in environmental management."}
                            />
                            <Divider />
                            <b>Duration: </b>
                            <p>{"5 years FT, 10 years PT Students have a maximum of 10 years to complete this course."}</p>
                            <Divider />
                            <b>Mode and location:</b>
                            <p>{"On-campus (Clayton)"}</p>
                            
                         </Grid.Row>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <b>Abbreviated title:</b>
                        <p>{"BE(Hons)/BComSpec"}</p>
                        <Divider />
                        <a target="blank" href="#">{"View " + "E3003" + " handbook entry"}</a>
                        <Divider />
                        <a target="blank" href="#">{"View study.monash entry for " +  "E3003"}</a>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
}