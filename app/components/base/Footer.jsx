import React from "react";
import {Container, Segment, Grid} from "semantic-ui-react";

/**
 * The footer component that is displayed at the bottom of the page.
 */
export default function Footer() {
    return (
        <Segment inverted attached="bottom" className="footer stackable">
            <Grid columns={4} stackable>
              <Grid.Row>
                <Grid.Column>
                </Grid.Column>
                <Grid.Column>
                    <Container textAlign="center">
                        <h4 className="ui inverted header">monPlan</h4>
                        <p>A Monash University Course Planner, designed by Monash Students, for Monash Students.</p>
                    </Container>
                </Grid.Column>
                <Grid.Column  textAlign="center">
                    <img className="logo" src="resources/img/monash.png" alt="logo" />
                    <p>Copyright &copy; Monash University 2016</p>
                </Grid.Column>
              </Grid.Row>
            <Grid.Column>
            </Grid.Column>
            </Grid>
        </Segment>
    );
}
