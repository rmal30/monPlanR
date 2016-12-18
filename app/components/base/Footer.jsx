import React from "react";
import {Container, Header, Segment, Grid} from "semantic-ui-react";

/**
 * The footer component that is displayed at the bottom of the page.
 */
export default function Footer() {
    return (
        <Segment inverted attached="bottom" className="footer stackable no-print">
            <Grid columns={4} stackable>
              <Grid.Row>
                <Grid.Column>
                </Grid.Column>
                <Grid.Column>
                    <Container textAlign="center">
                        <Header as="h4" inverted>
                            monPlan
                            <Header.Subheader>Version {MONPLAN_VERSION}</Header.Subheader>
                        </Header>
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
